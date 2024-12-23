#include <Wire.h>

const int Gauze = 11;
const int Medical_Tape = 12;
const int Scissors = 7;
const int Gloves = 9;
const int Rubbing_Alcohol = 6;
const int Epipen = 8;
const int Benadryl = 13;
const int Aspirin = 10;

const int NUM_PINS = 8;
int pins[NUM_PINS] = {Gauze, Medical_Tape, Scissors, Gloves, Rubbing_Alcohol, Epipen, Benadryl, Aspirin};

int ledStates[NUM_PINS] = {0};
int brightness = 255;
unsigned long previousMillis[NUM_PINS] = {0};
const long interval = 100;

void setup() {
  Wire.begin(0x08);
  Wire.onReceive(receiveEvent);

  for (int i = 0; i < NUM_PINS; i++) {
    pinMode(pins[i], OUTPUT);
    analogWrite(pins[i], 0);
  }

  Serial.begin(9600);
}

void loop() {
  unsigned long currentMillis = millis();
  for (int i = 0; i < NUM_PINS; i++) {
    if (ledStates[i] == 2) {
      if (currentMillis - previousMillis[i] >= interval) {
        previousMillis[i] = currentMillis;
        int currentValue = digitalRead(pins[i]);
        analogWrite(pins[i], currentValue == LOW ? brightness : 0);
      }
    }
  }
}

void receiveEvent(int bytes) {
  if (bytes < 2) return;

  int command = Wire.read();
  int value = Wire.read();

  if (command >= 1 && command <= NUM_PINS) {
    int index = command - 1;
    if (value == 0) {
      ledStates[index] = 0;
      analogWrite(pins[index], 0);
    } else if (value == 1) {
      ledStates[index] = 1; 
      analogWrite(pins[index], brightness);
    } else if (value == 2) {
      ledStates[index] = 2; 
    }
  }
}
