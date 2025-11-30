// In dieser App wurde alles in einer Datei gehalten.
// in App.js ist die komplette Logik und UI umgesetzt.
// Für produktive Projekte würde die Struktur modularisiert erolgen (Screens, Komonenten, Services etc etc)


import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import logo from "./assets/NoSmoke.jpg";

// Firebase Setup
const firebaseConfig = {
  apiKey: "API_KEY_ENTFERNT",
  authDomain: "PROJEKT_DOMAIN",
  databaseURL:
    "PROJEKT_ID",
  projectId: "antismokeapp",
  storageBucket: "antismokeapp.firebasestorage.app",
  messagingSenderId: "514643620958",
  appId: "1:514643620958:web:9cec2ac70599536d62f0cf",
  measurementId: "G-BV096JBZVS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const [quitDate, setQuitDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [costPerPack, setCostPerPack] = useState("");
  const [cigsPerDay, setCigsPerDay] = useState("");
  const [cigsPerPack, setCigsPerPack] = useState("");
  const [slipDays, setSlipDays] = useState("");

  // Authentication Funktionen
  async function handleLogin() {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUserEmail(result.user.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserEmail(result.user.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setUserEmail(null);
  }

  // Tage seit dem Rauchstopp
  function getDaysSmokeFree() {
    if (!quitDate) return 0;
    const today = new Date();
    const diff = today - quitDate;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)) + 1);
  }

  // Geld gespart
  function getMoneySaved() {
    if (!quitDate || !costPerPack || !cigsPerDay || !cigsPerPack) return 0;
    const days = getDaysSmokeFree() - (parseInt(slipDays) || 0);
    const costPerCig = parseFloat(costPerPack) / parseInt(cigsPerPack);
    const saved = days * parseInt(cigsPerDay) * costPerCig;
    return Math.max(0, saved).toFixed(2);
  }

  //Nicht gerauchte Zigis
  function getCigsNotSmoked() {
    if (!quitDate || !cigsPerDay) return 0;
    const days = getDaysSmokeFree() - (parseInt(slipDays) || 0);
    const cigs = days * parseInt(cigsPerDay || "0");
    return Math.max(0, cigs);
  }

  // DatePicker
  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  function handleConfirmDate(date) {
    setQuitDate(date);
    hideDatePicker();
  }

  // Login Screen
  if (!userEmail) {
    return (
      <View style={styles.loginContainer}>
        <StatusBar style="auto" />
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Anti-Smoke App</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleRegister}
            >
              <Text style={styles.buttonTextSecondary}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // Hauptscreen nach dem Login
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Welcome, {userEmail}</Text>

        <Text style={styles.text}>
          You are smoke-free for{" "}
          <Text style={styles.bold}>{getDaysSmokeFree()}</Text> days.
        </Text>

        <Text style={styles.text}>
          Quit date:{" "}
          {quitDate ? quitDate.toLocaleDateString() : "No date set yet"}
        </Text>

        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Pick date</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        {/* Overview Section */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getDaysSmokeFree()}</Text>
            <Text style={styles.statLabel}>Days smoke-free</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getMoneySaved()}</Text>
            <Text style={styles.statLabel}>CHF saved</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{getCigsNotSmoked()}</Text>
            <Text style={styles.statLabel}>Cigs not smoked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{slipDays || 0}</Text>
            <Text style={styles.statLabel}>Slip days</Text>
          </View>
        </View>

        <View style={{ height: 10 }} />

        {/* Profil*/}
        <Text style={styles.sectionTitle}>Smoking profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Cost per pack (CHF)"
          value={costPerPack}
          onChangeText={setCostPerPack}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cigarettes per day"
          value={cigsPerDay}
          onChangeText={setCigsPerDay}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cigarettes per pack"
          value={cigsPerPack}
          onChangeText={setCigsPerPack}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Slip days"
          value={slipDays}
          onChangeText={setSlipDays}
          keyboardType="numeric"
        />

        <Text style={styles.text}>
          You saved{" "}
          <Text style={styles.bold}>{getMoneySaved()} CHF</Text> since quitting.
        </Text>

        <TouchableOpacity style={styles.buttonSecondary} onPress={handleLogout}>
          <Text style={styles.buttonTextSecondary}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


//Designs 
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2e7d32",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#2e7d32",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#b8ccb5",
    backgroundColor: "#f5fff5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  buttonTextSecondary: {
    fontSize: 16,
    color: "#4caf50",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#f5fff5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#b8ccb5",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
  },
});
