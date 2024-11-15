// src/AuthForm.js
import React, { useState } from 'react';
import { signUp, signIn, logOut } from './auth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>You are logged in</h2>
          <button onClick={handleSignOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>

          <h2>Sign In</h2>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
