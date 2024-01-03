import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence, sendEmailVerification } from "firebase/auth";
import { AsyncStorage } from '@react-native-async-storage/async-storage'; // Si vous utilisez AsyncStorage
import { View, StyleSheet, TextInput, Button, ToastAndroid, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyDZJtasU-lCRwzOJy6SvVhnFp0mlHdhi6Q",
  authDomain: "weatherapp-d7948.firebaseapp.com",
  databaseURL: "https://weatherapp-d7948-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherapp-d7948",
  storageBucket: "weatherapp-d7948.appspot.com",
  messagingSenderId: "152564061772",
  appId: "1:152564061772:web:436c99ac4b70faa27786e9",
  measurementId: "G-GQC5HGS5Z9"
};

// Initialize Firebase



let auth, app, database;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    database = getDatabase(app);
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
  database = getDatabase(app);
}

export default function AuthScreen({navigation}) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
          // Email verification sent!
          console.log('Utilisateur créé :', user);
          Alert.alert('Success', 'vous etes inscrit');
        

        
      })
      .catch((error) => {
        Alert.alert('Error', error);

      });
  };

  const handleSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Utilisateur connecté :', user);

        Alert.alert('Success', 'vous etes connecte');

        console.log(user.uid);
        navigation.navigate('Main', { userId: user.uid });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('erreur:', errorMessage, );
        Alert.alert('Error', 'erreur dans le mdp ou mail');

      });


  };
  /*
  const goToMain = async () => {
    navigation.navigate('Main', { userId: user.uid });
  }*/
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
  }
});

// https://stackoverflow.com/questions/77048569/issue-with-initializing-firebase-auth-for-react-native-using-asyncstorage