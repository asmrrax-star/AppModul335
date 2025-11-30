Dieses Dokument beschreibt die notwendigen Schritte um die App für den Playstore vorzubereiten und als fertige Installationsdatei (apk) zu erstellen. 

Vorbereitung: 
1: 
- App vollständig entwickeln und mit Expo Go testen
- Im Projekt 'app.json' oder 'app.config.js' konfigueren:
-App Name, Icon und Splash-Screen
- Android Bundle ID definieren (zB com.antismoke.app)
- Version eintragen (version und android.versionCode)

2: 
-APK Release Build erstellen: 
- bash: eas build -p android --profile production
- Ergebnis: Signierte .apk Datei. Diese kann auf Android instaliert oder in der Google Play Console hochgeladen werden.

3: 
- APK auf das Smartphone übertragen per Download-Link
- Installation aktivieren (Auch aus unbekannter Quelle zulassen)
- App starten und die FUnktionen testen

4: 
- Entwicklerkonto bei Google Play erstellen
- Neue App anlegen
- Appstore Infos Ausfüllen wie z.B. Titel, Beschreibung, Kategorie
- Icon und Bilder hinzufügen
- Die APK hochladen
- App prüfen lassen
- Die Veröffentlichung benatragen

5:
- Datenschutzbestimmungen bereitstellen
- Keine sensiblen Benutzerdaten erfassen
- Firebase Authentication DSGVO-konform einrichten

