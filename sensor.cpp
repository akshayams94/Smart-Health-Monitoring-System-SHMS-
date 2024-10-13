// iot-devices/heart_rate_sensor.cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";
const char* mqtt_server = "mqtt.example.com";

// Create WiFi and MQTT client instances
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
}

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Simulate heart rate sensor data
  int heartRate = analogRead(A0);
  
  // Publish sensor data to MQTT broker
  String payload = String(heartRate);
  client.publish("health/heartRate", payload.c_str());

  delay(5000);  // Publish data every 5 seconds
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect("HeartRateSensorClient")) {
      Serial.println("Connected to MQTT broker");
    } else {
      delay(5000);
    }
  }
}
