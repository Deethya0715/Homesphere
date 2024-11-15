import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView

import colors from '../config/colors'; // Color configuration

import LoginScreen from '../screens/loginscreen';
import StartScreen from '../screens/startscreen'; 
import RegistrationScreen from '../screens/registrationscreen'; 
import ForgotPasswordScreen from '../screens/forgotpasswordscreen';
import OwnerDashboard from '../screens/ownerdashboard';
import TenantDashboard from '../screens/tenantdashboard';
import OwnerRegistrationScreen from '../screens/ownerregistrationscreen';
import TenantRegistrationScreen from '../screens/tenantregistrationscreen';
import TenantList from '../screens/tenantlist';
import { auth, onAuthStateChanged } from '../src/firebase-config'; // Import the necessary Firebase functions

// Create stack navigator
const Stack = createNativeStackNavigator();

// Main App Component
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check if the user is logged in (onAuthStateChanged listener)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    });

    // Cleanup on unmount
    return unsubscribe;
  }, []);

  // If authentication state is still loading, show loading screen or splash
  if (isAuthenticated === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text> {/* Or use a spinner */}
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView style={{ flex: 1 }}>  {/* Wrap with GestureHandlerRootView */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="TenantRegistrationScreen" component={TenantRegistrationScreen} />
            <Stack.Screen name="OwnerRegistrationScreen" component={OwnerRegistrationScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="TenantDashboard" component={TenantDashboard} />
            <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />
            <Stack.Screen name="TenantList" component={TenantList} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
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
    fontSize: 10,
    fontWeight: 'bold',
  },
});
