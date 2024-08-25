#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <uri/UriBraces.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL 6

WebServer server(80);
const int LED_W = 25;
int mVperAmp = 185; // this the 5A version of the ACS712 -use 100 for 20A Module and 66 for 30A Module
int Watt = 0;
double Voltage = 0;
double VRMS = 0;
double AmpsRMS = 0;
bool ledState = false;

void setup(void) {
  Serial.begin(115200);
  pinMode(LED_W, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD, WIFI_CHANNEL);

  Serial.print("Connecting to WiFi ");
  Serial.print(WIFI_SSID);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
  Serial.println(" Connected!");

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on(UriBraces("/toggle/{}"), []() {
    String led = server.pathArg(0);
    Serial.print("Toggle LED #");
    Serial.println(led);
    
    switch (led.toInt())
    {
    case 1:
        digitalWrite(LED_W, HIGH);
      break;
    case 0: 
        digitalWrite(LED_W, LOW);
        break;
    default:
        server.send(404, "application/json", "{status: 404, message: 'ERROR: Invalid Path'}");
        return;
      break;
    }
    String responseJson = "{status: 200, state: LED_STATE}";
    responseJson.replace("LED_STATE", led);
    server.send(200, "application/json", responseJson);
  });

  server.begin();
  Serial.println("HTTP server started (http://localhost:8180)");
}

void loop(void) {
  server.handleClient();
  Serial.println(random());
}