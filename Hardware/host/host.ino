#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>

const char* WIFI_SSID = "SHAW-4FF4";
const char* WIFI_PASSWORD = "feast2013around";
const char* RELAY_SERVER_URL = "http://10.0.0.250:3333/api";

const char* AP_SSID = "LifePod";
const char* AP_PASSWORD = "12345678";
const int SLAVE_ADDRESS = 0x08;

// Web server on port 80
ESP8266WebServer server(80);
WiFiClient wifiClient; // Create a WiFiClient object

// Function to parse JSON and extract pin and status
bool parseJson(String jsonString, int &pin, int &status) {
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, jsonString);

    if (error) {
        Serial.print("JSON Parsing failed: ");
        Serial.println(error.c_str());
        return false;
    }

    pin = doc["pin"] | -1;        // Default to -1 if key is missing
    status = doc["status"] | -1;  // Default to -1 if key is missing
    return true;
}

// Function to setup access point
void setupAccessPoint() {
    WiFi.softAP(AP_SSID, AP_PASSWORD);
    Serial.println("Access Point created:");
    Serial.println(WiFi.softAPIP());
}

// Function to connect to Wi-Fi
void connectToWiFi() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.println("Connecting to Wi-Fi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to Wi-Fi:");
    Serial.println(WiFi.localIP());
}

// Function to handle incoming HTTP requests
void handleRequest() {
    if (server.method() != HTTP_GET) {
        server.send(405, "text/plain", "Method Not Allowed");
        return;
    }

    if (!server.hasArg("plain")) {
        server.send(400, "text/plain", "Bad Request: Missing JSON data");
        return;
    }

    String jsonString = server.arg("plain");
    int pin = -1, status = -1;

    if (!parseJson(jsonString, pin, status)) {
        server.send(400, "text/plain", "Bad Request: Invalid JSON data");
        return;
    }

    if (pin >= 0 && (status == 0 || status == 1)) {
        // Send to I2C slave
        Wire.beginTransmission(SLAVE_ADDRESS);
        Wire.write(pin);
        Wire.write(status);
        Wire.endTransmission();

        Serial.print("I2C Transmission: pin=");
        Serial.print(pin);
        Serial.print(", status=");
        Serial.println(status);

        server.send(200, "application/json", "{\"message\":\"I2C transmission successful\"}");
        return;
    }

    // Forward JSON to relay server
    HTTPClient http;
    http.begin(wifiClient, RELAY_SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST(jsonString);
    String response = http.getString();

    if (httpCode > 0) {
        Serial.println("Relay server response: " + response);
        server.send(httpCode, "application/json", response);
    } else {
        Serial.println("Error contacting relay server: " + http.errorToString(httpCode));
        server.send(500, "text/plain", "Error contacting relay server");
    }

    http.end();
}

// Setup function
void setup() {
    Serial.begin(115200);
    Wire.begin();

    setupAccessPoint();
    connectToWiFi();

    // Set up the web server routes
    server.on("/", handleRequest);
    server.begin();
    Serial.println("Web server started.");
}

// Main loop
void loop() {
    server.handleClient();
}
