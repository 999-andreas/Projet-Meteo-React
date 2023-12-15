import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZJtasU-lCRwzOJy6SvVhnFp0mlHdhi6Q",
  authDomain: "weatherapp-d7948.firebaseapp.com",
  projectId: "weatherapp-d7948",
  storageBucket: "weatherapp-d7948.appspot.com",
  messagingSenderId: "152564061772",
  appId: "1:152564061772:web:436c99ac4b70faa27786e9",
  measurementId: "G-GQC5HGS5Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function AuthScreen() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('Utilisateur créé :', userCredential.user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Utilisateur connecté :', userCredential.user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="S'inscrire" onPress={handleSignUp} />
      <Button title="Se connecter" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%', 
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});