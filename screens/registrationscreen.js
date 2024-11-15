import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import colors from '../config/colors'; // Assuming you have a colors configuration file

export default function SignUpScreen() {
  // State for user registration details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the registration logic
  const handleSignUp = () => {
    // Simple validation for email and password
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password');
      return;
    }

    // Simple email validation regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    // Check for password length (you can add stronger password policies)
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // If validation passes, show success (in a real app, you'd handle user registration here)
    Alert.alert('Success', 'Registration successful!');

    // Clear input fields
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.textHome}>Sign Up</Text>

        {/* Form for email and password */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={colors.pink}
            keyboardType="email-address" // For email input type
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.pink}
            secureTextEntry // Hides the password input
          />

          {/* Sign up button */}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl, // Light background color
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  contentWrapper: {
    width: '100%',
    alignItems: 'center', // Center content horizontally
  },
  textHome: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.black, // Dark text color
    textAlign: 'center',
  },
  formContainer: {
    width: '90%', // Restrict form width
    alignItems: 'center',
    justifyContent: 'center', // Center form contents
    marginBottom: 30, // Space below the form
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white, // White input background
    borderColor: colors.green, // Green border for input
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.green, // Green button background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white, // White text color for button
    fontSize: 16,
    fontWeight: 'bold',
  },
});
