import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>
            <One topic={"led"} text={
                `
void setup() {
  pinMode(2, OUTPUT);
}

void loop() {
  digitalWrite(2, HIGH);
  delay(1000);
  digitalWrite(2, LOW);
  delay(1000);
}

void setup() {
  // put your setup code here, to run once: 
  pinMode(2, OUTPUT);
  pinMode(35, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly: 
  if (digitalRead(35) == HIGH) {
    digitalWrite(2, HIGH);
  } else {
    digitalWrite(2, LOW);
  }
}
              `
            } />

            <One topic={"ldr"} text={
                `
void setup() { 
  pinMode(2, OUTPUT);
  pinMode(35, INPUT);
}

void loop() {
  if (analogRead(36) <= 800) {
    digitalWrite(2, HIGH);
  } else {
    digitalWrite(2, LOW);
  }
}
              `
            } />

            <One topic={"humidity"} text={
                `
#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
}

void loop() {
  delay(2000);

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print("%  Temperature: ");
  Serial.print(t);
  Serial.print("°C, ");
  Serial.print(f);
  Serial.print("°F  Heat index: ");
  Serial.print(hic);
  Serial.print("°C, ");
  Serial.print(hif);
  Serial.println("°F");
}
                `
            } />

            <One topic={"ldr"} text={
                `
const int IR_PIN = 33;
const int BUZZER_PIN = 14;

bool INVERT_LOGIC = true;

const unsigned long beepMs = 200;
const unsigned long holdoff = 400;

int lastState = -1;

bool isDetected(int raw) {
  return INVERT_LOGIC ? (raw == LOW) : (raw == HIGH);
}

void setup() {
  Serial.begin(115200);
  pinMode(IR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  int r = digitalRead(IR_PIN);
  lastState = r;
}

void loop() {
  int r = digitalRead(IR_PIN);
  if (r != lastState) {
    lastState = r;
    if (isDetected(r)) {
      Serial.println("Obstacle detected");
      digitalWrite(BUZZER_PIN, HIGH);
      delay(beepMs);
      digitalWrite(BUZZER_PIN, LOW);
    } else {
      Serial.println("No obstacle");
    }
    delay(holdoff);
  }
}
              `
            } />

            <One topic={"lcd"} text={
                `
#include <LiquidCrystal_I2C.h>

#define LCD_ADDR 0x27
LiquidCrystal_I2C lcd(LCD_ADDR, 16, 2);

String nameStr = "Your Name";
String semStr  = "Sem: 5";
String deptStr = "Dept: CSE";
String colStr  = "College: GAT";

void setup() {
  Serial.begin(115115);
  lcd.init();
  lcd.backlight();
}

void loop() {
  lcd.clear();
  lcd.setCursor(0,0); lcd.print(nameStr);
  lcd.setCursor(0,1); lcd.print(semStr);
  delay(2000);

  lcd.clear();
  lcd.setCursor(0,0); lcd.print(deptStr);
  lcd.setCursor(0,1); lcd.print(colStr);
  delay(2000);
}
               `
            } />

            <One topic={"IR"} text={
                `
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

const int TRIG_PIN = 12;
const int ECHO_PIN = 35;

float usToCm(long us) {
  return (us * 0.0343f) / 2.0f;
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0,0); 
  lcd.print("Ultrasonic Ready");
  delay(800);
}

long readUS() {
  digitalWrite(TRIG_PIN, LOW); 
  delayMicroseconds(4);
  digitalWrite(TRIG_PIN, HIGH); 
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  return pulseIn(ECHO_PIN, HIGH, 25000UL);
}

void loop() {
  const int N = 5;
  long sum = 0;
  int valid = 0;

  for (int i = 0; i < N; i++) {
    long d = readUS();
    if (d > 0) { sum += d; valid++; }
    delay(40);
  }

  lcd.clear();

  if (valid == 0) {
    lcd.setCursor(0,0); lcd.print("Out of range");
    lcd.setCursor(0,1); lcd.print("Try closer");
    Serial.println("No echo");
  } else {
    float us = (float)sum / valid;
    float cm = usToCm(us);
    lcd.setCursor(0,0); 
    lcd.print("Dist: "); 
    lcd.print(cm, 1); 
    lcd.print(" cm");
    Serial.printf("us=%.1f  cm=%.2f\n", us, cm);
  }

  delay(300);
}
               `
            } />

            <One topic={"7"} text={
                `
#include "WiFi.h"

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
}

void loop() {
  Serial.println("scan start");
  int n = WiFi.scanNetworks();
  Serial.println("scan done");

  if (n == 0) {
    Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN) ? " " : "*");
      delay(10);
    }
  }

  Serial.println();
  delay(5000);
}

#include <WiFi.h>

const char *ssid = "SSID_Name_your_Choice";
const char *password = "Your_Choice"; 
IPAddress local_IP(192,168,4,22);
IPAddress gateway(192,168,4,9);
IPAddress subnet(255,255,255,0);

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.print("Soft-AP config: ");
  Serial.println(WiFi.softAPConfig(local_IP, gateway, subnet) ? "Ready" : "Failed");
  Serial.print("Soft-AP start: ");
  Serial.println(WiFi.softAP(ssid, password) ? "Ready" : "Failed");
  Serial.print("Soft-AP IP = ");
  Serial.println(WiFi.softAPIP());
}

void loop() {
  Serial.print("[Server Connected] ");
  Serial.println(WiFi.softAPIP());
  delay(500);
}
               `
            } />

             <One topic={"7"} text={
                `
#include <WiFi.h>

char ssid[] = "REPLACE_WITH_YOUR_SSID";
char password[] = "REPLACE_WITH_YOUR_PASSWORD";

IPAddress ip;
IPAddress gateway;

void setup() {
  Serial.begin(115200);
  Serial.print("Connecting to: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }

  Serial.println("\nConnected to network");

  while (WiFi.localIP() == INADDR_NONE) {
    Serial.print(".");
    delay(300);
  }

  ip = WiFi.localIP();
  gateway = WiFi.gatewayIP();

  Serial.print("IP Address: ");
  Serial.println(ip);
  Serial.print("Gateway: ");
  Serial.println(gateway);
}

void loop() {
}
               `
            } />

        </div>
    )
}

export default App
