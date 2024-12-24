#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <WiFiClientSecure.h>

const char* WIFI_SSID = "SHAW-4FF4";
const char* WIFI_PASSWORD = "feast2013around";
const char* SERVER_URL = "https://lifepod-production.up.railway.app/api/get/box/contents";
const int SLAVE_ADDRESS = 0x08;

WiFiClientSecure wifiClient;

void connectToWiFi() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.println("Connecting to Wi-Fi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to Wi-Fi:");
    Serial.println(WiFi.localIP());
    wifiClient.setInsecure();
}

void updateLEDs(const JsonObject& data) {
    for (JsonPair kv : data) {
        const char* item = kv.key().c_str();
        bool status = strcmp(kv.value().as<const char*>(), "true") == 0;

        // Example: Map each item to a pin number (adjust as necessary)
        int pin = -1;
        if (strcmp(item, "gauze") == 0) pin = 1;
        else if (strcmp(item, "aspirin") == 0) pin = 8;
        else if (strcmp(item, "rubbing alcohol") == 0) pin = 5;
        else if (strcmp(item, "epi pen") == 0) pin = 6;
        else if (strcmp(item, "medical tape") == 0) pin = 2;
        else if (strcmp(item, "gloves") == 0) pin = 4;
        else if (strcmp(item, "benadryl") == 0) pin = 7;
        else if (strcmp(item, "scissors") == 0) pin = 3;
        else if (strcmp(item, "alarm") == 0) pin = 9;

        if (pin >= 0) {
            // Send I2C command to update the corresponding LED
            Wire.beginTransmission(SLAVE_ADDRESS);
            Wire.write(pin);
            Wire.write(status ? 1 : 0);
            Wire.endTransmission();

            Serial.print("Updated ");
            Serial.print(item);
            Serial.print(" LED to ");
            Serial.println(status ? "ON" : "OFF");
        }
    }
}

void fetchAndProcessData() {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Wi-Fi not connected, attempting to reconnect...");
        connectToWiFi();
        return;
    }

    HTTPClient http;
    http.begin(wifiClient, SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    // Create JSON payload
    StaticJsonDocument<128> jsonDoc;
    jsonDoc["boxid"] = 1;

    String jsonString;
    serializeJson(jsonDoc, jsonString);

    // Make POST request
    int httpCode = http.POST(jsonString);
    if (httpCode == HTTP_CODE_OK) {
        String payload = http.getString();
        Serial.println("Server response: " + payload);

        StaticJsonDocument<512> doc;
        DeserializationError error = deserializeJson(doc, payload);
        if (error) {
            Serial.print("JSON Parsing failed: ");
            Serial.println(error.c_str());
        } else {
            JsonObject data = doc.as<JsonObject>();
            updateLEDs(data);
        }
    } else {
        Serial.print("HTTP POST failed: ");
        Serial.println(http.errorToString(httpCode));
    }

    http.end();
}

void setup() {
    Serial.begin(115200);
    Wire.begin();

    connectToWiFi();
}

void loop() {
    fetchAndProcessData();
    delay(1000); // Wait 1 second before the next request
}
