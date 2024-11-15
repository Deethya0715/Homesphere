// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../src/firebase-config';
import * as Google from 'expo-auth-session/providers/google';
import colors from '../config/colors';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Auth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Logged in successfully!',
          });
          navigation.replace('OwnerDashboard');
        })
        .catch((error) => {
          Alert.alert('Error', 'Google Sign-In failed');
          console.error('Error signing in with Google:', error);
        });
    }
  }, [response]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({ type: 'success', position: 'top', text1: 'Logged in successfully!' });
      navigation.replace('OwnerDashboard');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHome}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} placeholderTextColor={colors.pink} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor={colors.pink} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()} disabled={!request}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')} style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.pearl, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  textHome: { fontSize: 24, marginVertical: 20, color: colors.black, textAlign: 'center' },
  input: { width: '100%', height: 50, borderColor: colors.black, borderWidth: 1, marginVertical: 10, paddingLeft: 10, borderRadius: 5 },
  loginButton: { width: '100%', height: 50, backgroundColor: colors.green, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  googleButton: { width: '100%', height: 50, backgroundColor: '#4285F4', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginVertical: 10 },
  googleButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  signupTextContainer: { marginTop: 10 },
  signupText: { color: colors.green, fontSize: 14, textDecorationLine: 'underline' },
});
