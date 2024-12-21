#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "YourWiFiSSID";
const char* WIFI_PASSWORD = "YourWiFiPassword";
const char* RELAY_SERVER_URL = "http://example.com/api";

const char* AP_SSID = "ESP8266_AP";
const char* AP_PASSWORD = "12345678";

ESP8266WebServer server(80);

void setupAccessPoint() {
  WiFi.softAP(AP_SSID, AP_PASSWORD);
  Serial.println("Access Point created:");
  Serial.println(WiFi.softAPIP());
}

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
  Serial.println("Received JSON: " + jsonString);

  HTTPClient http;
  http.begin(RELAY_SERVER_URL);
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

  server.on("/", handleRequest);

  server.begin();
  Serial.println("Web server started.");
}

void loop() {
  server.handleClient();
}
