import One from './components/One.jsx'

function App() {

    return (
        <div style={{ padding: "20px" }}>
            <h2>Part A: Networking & Security (C Programming)</h2>
            <hr />

            <One topic={"1.1 Caesar Cipher Variant"} text={
                `
// Shifting characters by 3 positions with wrapping [cite: 8]
#include <stdio.h>
#include <string.h>

int main() {
    char msg[100], encr[100], decr[100], rec[100];
    int i;

    printf("\\n Enter the message for encryption:\\n");
    scanf("%s", msg);

    // Encryption Logic [cite: 22]
    for (i = 0; *(msg + i) != '\\0'; i++) {
        if ((*(msg + i) >= 'a' && *(msg + i) <= 'w') || (*(msg + i) >= 'A' && *(msg + i) <= 'W'))
            *(encr + i) = *(msg + i) + 3;
        else if ((*(msg + i) >= 'x' && *(msg + i) <= 'z') || (*(msg + i) >= 'X' && *(msg + i) <= 'Z'))
            *(encr + i) = *(msg + i) + 3 - 26;
        else
            *(encr + i) = *(msg + i);
    }
    *(encr + i) = '\\0';
    printf("\\n Encrypted message: %s\\n", encr);

    // Decryption Logic [cite: 62]
    printf("\\n Enter the message for decryption:\\n");
    scanf("%s", rec);
    for (i = 0; *(rec + i) != '\\0'; i++) {
        if ((*(rec + i) >= 'd' && *(rec + i) <= 'z') || (*(rec + i) >= 'D' && *(rec + i) <= 'Z'))
            *(decr + i) = *(rec + i) - 3;
        else if ((*(rec + i) >= 'a' && *(rec + i) <= 'c') || (*(rec + i) >= 'A' && *(rec + i) <= 'C'))
            *(decr + i) = *(rec + i) - 3 + 26;
        else
            *(decr + i) = *(rec + i);
    }
    *(decr + i) = '\\0';
    printf("\\n The decrypted message: \\n %s\\n", decr);
    return 0;
}
                `
            } />

            <One topic={"1.2 Columnar Transposition"} text={
                `
// Reordering columns based on a keyword [cite: 104]
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char txt[50], kw[10], kw1[10], temp;
    char txt1[10][10], encr[10][10], decr[10][10];
    int lenm, lenk, order[10], i, j, k, temp1, c = 0, r, b, count = 0;

    printf("\\nEnter the message to be encrypted: ");
    scanf("%s", txt);
    lenm = strlen(txt);

    printf("\\nEnter the keyword: ");
    scanf("%s", kw);
    lenk = strlen(kw);
    strcpy(kw1, kw);

    for (i = 0; i < lenk; i++) order[i] = i;

    // Sort keyword to determine column order [cite: 146]
    for (i = 0; i < lenk; i++) {
        for (j = i + 1; j < lenk; j++) {
            if (kw1[i] > kw1[j]) {
                temp = kw1[i]; kw1[i] = kw1[j]; kw1[j] = temp;
                temp1 = order[i]; order[i] = order[j]; order[j] = temp1;
            }
        }
    }

    r = lenm / lenk;
    b = lenm % lenk;
    if (b != 0) r++;

    // Fill the matrix [cite: 205]
    for (i = 0; i < r; i++) {
        for (j = 0; j < lenk; j++) {
            if (count < lenm) txt1[i][j] = txt[count++];
            else txt1[i][j] = 'a' + c++;
        }
    }

    printf("\\n\\nThe encrypted message: \\n");
    for (k = 0; k < lenk; k++) {
        j = order[k];
        for (i = 0; i < r; i++) {
            encr[i][k] = txt1[i][j];
            printf("%c", encr[i][k]);
        }
    }
    return 0;
}
                `
            } />

            <One topic={"1.3 Byte Stuffing"} text={
                `
// Framing using DLE, STX, and ETX [cite: 303]
#include <stdio.h>
#include <string.h>

int main() {
    char msg[100], smsg[100], tmsg[100];
    int i, j;

    printf("\\nEnter the message:\\n");
    scanf("%s", msg);

    // Stuffing [cite: 330]
    for (i = 0, j = 0; *(msg + i) != '\\0'; i++, j++) {
        if (!strncmp(msg + i, "DLE", 3)) {
            strcat(smsg, "DLEDLE");
            j += 5; i += 2;
        } else {
            *(smsg + j) = *(msg + i);
        }
    }
    *(smsg + j) = '\\0';

    strcpy(tmsg, "DLESTX");
    strcat(tmsg, smsg);
    strcat(tmsg, "DLEETX");
    printf("\\nThe stuffed message is: \\n%s", tmsg);
    return 0;
}
                `
            } />

            <One topic={"1.4 Bit Stuffing"} text={
                `
// Inserting 0 after five consecutive 1s [cite: 430]
#include <stdio.h>
#include <string.h>

int main() {
    char msg[100], smsg[100];
    int i, j = 0, count = 0;

    printf("\\n Enter the message:\\n");
    scanf("%s", msg);

    for (i = 0; msg[i] != '\\0'; i++, j++) {
        smsg[j] = msg[i];
        if (msg[i] == '1') count++;
        else count = 0;

        if (count == 5) {
            j++;
            smsg[j] = '0';
            count = 0;
        }
    }
    smsg[j] = '\\0';
    printf("\\n The stuffed message: \\n %s", smsg);
    return 0;
}
                `
            } />

            <One topic={"1.5 Dijkstra's Algorithm"} text={
                `
// Calculates shortest path in a graph [cite: 593]
#include <stdio.h>
#define MAXNODE 10
#define INFINITY 100

int n;
int dist[8][8] = { /* matrix contents from manual [cite: 600-665] */ };

void shrt(int s, int t) {
    // Dijkstra's Loop logic [cite: 740]
    // ... (refer to manual section 1.5 for full logic)
}

int main() {
    int s, t;
    printf("\\n Enter the no of nodes (Max 8): ");
    scanf("%d", &n);
    printf("\\n Enter source & dest nodes: ");
    scanf("%d%d", &s, &t);
    shrt(s, t);
    return 0;
}
                `
            } />

            <One topic={"1.6 Cyclic Redundancy Check (CRC)"} text={
                `
// Error detection using generator polynomials [cite: 810]
#include <stdio.h>
int dg = 16, data[50];
int gen[17] = {1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1}; // CRC-CCITT [cite: 816]

void crc(int msg[]) {
    // CRC calculation logic [cite: 920]
}

int main() {
    // Input and CRC calculation flow [cite: 822]
    return 0;
}
                `
            } />

            <br />
            <h2>Part B: IoT Development (Python)</h2>
            <hr />

            <One topic={"2.1 Temperature & Humidity (DHT11)"} text={
                `
# Reads DHT11 and uploads to ThingSpeak [cite: 1025]
import RPi.GPIO as GPIO
import Adafruit_DHT as dht
import urllib.request as urllib2

myAPI = "PJTVJHOYGXLPNTOW" # [cite: 1034]
baseURL = 'https://api.thingspeak.com/update?api_key=%s' % myAPI

sensor = dht.DHT11
dht11_pin = 4

while True:
    humidity, temp = dht.read_retry(sensor, dht11_pin)
    if temp is not None:
        conn = urllib2.urlopen(baseURL + '&field1=%s&field2=%s' % (temp, humidity))
        print('Data sent to cloud successfully')
                `
            } />

            <One topic={"2.2 Ultrasonic Sensor"} text={
                `
# Measures distance and uploads to ThingSpeak [cite: 1081]
import RPi.GPIO as GPIO
import time
import urllib.request as urllib2

trig_pin = 19
echo_pin = 26

GPIO.setmode(GPIO.BCM)
GPIO.setup(trig_pin, GPIO.OUT)
GPIO.setup(echo_pin, GPIO.IN)

# Logic to trigger pulse and calculate duration [cite: 1133-1146]
# distance = pulse_duration * 17150
                `
            } />

            <One topic={"2.3 Soil Moisture Sensor"} text={
                `
# Reads analog data via MCP3008 ADC [cite: 1157]
import Adafruit_MCP3008
import urllib.request as urllib2

mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(0, 0))

while True:
    moisture_value = mcp.read_adc(1) # [cite: 1188]
    conn = urllib2.urlopen(baseURL + '&field1=%s' % (moisture_value))
                `
            } />

            <One topic={"2.4 Light Sensor"} text={
                `
# Detects light presence via GPIO [cite: 1209]
import RPi.GPIO as GPIO
import urllib.request as urllib2

light_sensor_pin = 13
GPIO.setup(light_sensor_pin, GPIO.IN)

while True:
    light_value = GPIO.input(light_sensor_pin) # [cite: 1234]
    if light_value == 0:
        print("light detected")
                `
            } />

        </div>
    )
}

export default App