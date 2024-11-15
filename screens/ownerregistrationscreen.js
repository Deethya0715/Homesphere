import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import colors from '../config/colors';

export default function RegistrationScreen() {
  return (
    <SafeAreaView>
      <Text>Owner Registration Screen</Text>
    </SafeAreaView>
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
  LoginButton: {
    width: 200, // Adjust width as needed for a better look
    height: 50,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10, // Added margin for spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Increased font size for better readability
    fontWeight: 'bold',
  },
});
