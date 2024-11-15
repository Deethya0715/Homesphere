// src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase-config';

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error.message);
    throw error;
  }
};

// Log out function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
  } catch (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};
