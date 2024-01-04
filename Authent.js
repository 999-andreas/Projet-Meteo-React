import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { AsyncStorage } from '@react-native-async-storage/async-storage'; // Si vous utilisez AsyncStorage
import { View, StyleSheet, TextInput, ToastAndroid, Platform, Alert, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { getDatabase } from "firebase/database";
import logo from './assets/logo-meteo.png';


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



let auth, app;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
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
        console.log('Utilisateur créé :', user);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Vous êtes maintenant inscrit !', ToastAndroid.SHORT)
        } else {
          //AlertIOS.alert('Vous êtes maintenant inscrit !');
        }

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
        console.log('Utilisateur connecté :', user);

        Alert.alert('Success', 'Vous êtes connecté');

        console.log(user.uid);
        navigation.navigate('Main', { userId: user.uid });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log('erreur:', errorMessage, );
        Alert.alert('Error', 'Erreur dans le mail ou mot de passe');

      });


  };
  const goToMain = async () => {
    navigation.navigate('Main');
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
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
      <Button title="S'inscrire" onPress={handleSignUp} buttonStyle={styles.button}/>
      <Button title="Se connecter" onPress={handleSignIn} buttonStyle={styles.button}/>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#77B5FE",
  },
  logo: {
    width: 400,
    height: 400,
  },
  content: {
    alignItems: 'center',
    width: '80%', 
  },
  input: {
    width: '90%',
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6092CD'
  }
});

// https://stackoverflow.com/questions/77048569/issue-with-initializing-firebase-auth-for-react-native-using-asyncstorage