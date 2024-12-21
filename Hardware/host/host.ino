#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "SHAW-4FF4";
const char* WIFI_PASSWORD = "feast2013around";
const char* RELAY_SERVER_URL = "http://10.0.0.250:3333/api";

const char* AP_SSID = "LifePod";
const char* AP_PASSWORD = "12345678";

// Web server on port 80
ESP8266WebServer server(80);
WiFiClient wifiClient; // Create a WiFiClient object

// Setup access point
void setupAccessPoint() {
  WiFi.softAP(AP_SSID, AP_PASSWORD);
  Serial.println("Access Point created:");
  Serial.println(WiFi.softAPIP());
}

// Connect to Wi-Fi
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

// Handle incoming requests
void handleRequest() {
  if (server.method() != HTTP_GET) {
    server.send(405, "text/plain", "Method Not Allowed");
    return;
  }

  // Parse JSON data from query parameters
  if (!server.hasArg("plain")) {
    server.send(400, "text/plain", "Bad Request: Missing JSON data");
    return;
  }

  String jsonString = server.arg("plain");
  Serial.println("Received JSON: " + jsonString);

  // Forward JSON to relay server
  HTTPClient http;
  http.begin(wifiClient, RELAY_SERVER_URL); // Use WiFiClient and URL
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(jsonString);
  String response = http.getString();

  if (httpCode > 0) {
    Serial.println("Response from relay server: " + response);
    server.send(httpCode, "application/json", response);
  } else {
    Serial.println("Error sending to relay server: " + http.errorToString(httpCode));
    server.send(500, "text/plain", "Error contacting relay server");
  }

  http.end();
}

void setup() {
  Serial.begin(115200);

  setupAccessPoint();
  connectToWiFi();

  // Set up the web server routes
  server.on("/", handleRequest);

  server.begin();
  Serial.println("Web server started.");
}

void loop() {
  server.handleClient();
}
