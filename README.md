# AppModul335
Diese App wurde für unsere Modulprüfung für das Modul 335 entwickelt. 

Ich habe mich für diese 'Anti-Smoke' App entschieden da es mich auch persönlich betrifft.
Ich wollte eine App entwickeln, die einen echten Mehrwert wiedergeben kann. 

Ziel der Anwendung ist es, Personen beim Rauchstopp zu helfen und die persönlichen Gewohnheiten zu dokumentieren.
Die App zeigt unter anderem:
- Wie viele Tage man rauchfrei ist
- Wie viel Geld man seit dem Aufhören gespart hat
- Wie viele Zigaretten nicht konsumiert wurden
- Wie viele Rückfälle man hatte
Die Umsetzung erfolgte mit Expo / React Native und verwendet Firebase Authentication für das Login und die Registierung.
Der Fokus liegt auf einfacher Bedientbarkeit, einem leichten aber schönen Design und Statistiken.

Funktionen: 

- Loging und Regristierung => über Firebase Authentication 
- Rauchstopp Datum => Auswahl über Datetime Picker
- Stastik Übersicht => Rauchfreie Tage, Geld gespart, nicht gerauchte Zigis 
- Kostenberechnung => Basieren auf persönlichen Angaben
- Slip Days => Rückfälle werden berücksichtigt 
- Automatische Aktualisierung => Die Statistik aktualisiert sich täglich 
- Responsive Design => Für mobiel Geräte optimiert (iOS und Android) 

Technologien: 

- React Native (Expo) => Frontend und mobile UI 
- Fire Base Authentication => Login und Registrierung
- JavaScript => Logik und Berechnungen 
- React Native Modal Datetime Picker => Datumsauswahl 
- Google Fonts => Design und UI 


Installation der App: 
Repository klonen:
'''bash
git clone 
cd AppModul335

Die Abhänigkeiten installieren: 
npm install 
npx expo install react-native-modal-datetime-picker @react-native-community/datetimepicker

Die App starten:
npx expo start => QR Code scannen mit der Expo Go App scannen

Firebase Setup: 
in App.js die folgenden Konfigurationsdaten definieren: 

- const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};
- Das Firebase Projekt muss vorher auf https://console.firebase.google.com erstellt werden!


geplante Erweiterungen: 
- Ziele und Meilensteine (zB nach gewisser Anzahl der Tage)
- Verlauf und Diagramme 

Entwickler:
Srecko Radisavljevic 

HINWEIS: Diese App dient zur Selbstmotivation und ist KEIN Ersatz für medizinische Beratung! 













