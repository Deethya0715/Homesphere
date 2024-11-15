import React from 'react';
import { TouchableWithoutFeedback, Keyboard, SafeAreaView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'; // Added Image and StyleSheet import
import colors from '../config/colors';

export default function StartScreen({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../src/assets/logo.jpg')} style={styles.logo} /> {/* Correctly using Image */}
        <Text style={styles.textHome}>Welcome to HomeSphere!</Text>
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHome: {
    fontSize: 24,
    marginVertical: 20,
    color: colors.black, 
    textAlign: 'center',
  },
  squareButton: {
    width: 125,
    height: 50,
    backgroundColor: colors.green, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 150, // Adjust the size as needed
    height: 150,
    resizeMode: 'contain',
  },
});
