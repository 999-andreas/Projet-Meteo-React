import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, updateEmail, sendPasswordResetEmail, signOut } from "firebase/auth";
import firebase from 'firebase/app';
import 'firebase/auth';

const MonCompteScreen = ({navigation, route}) => {
  const [newEmail, setNewEmail] = useState('');

  const auth= getAuth();
  const user_email= auth.currentUser.email;

  const changeEmail = () => {
    //const user = auth.currentUser;

    updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        Alert.alert('Success', 'Email mis à jour avec succès');
      }).catch((error) => {
        // An error occurred
        Alert.alert('Error', error.message);

      });
  };

  const changePassword = () => {
    sendPasswordResetEmail(auth, user_email)
    .then(() => {
        // Password reset email sent!
        Alert.alert('Success', 'un email vous a été envoyé');

    })
    .catch((error) => {
        Alert.alert('Error', error);
    });
  };

  const signOutUser = () => {
    signOut(auth)
    .then(() => {
        navigation.navigate("Auth");
    }).catch((error) => {
        Alert.alert('Error', error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nouvelle adresse e-mail"
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
      />
      <Button title="Changer d'e-mail" onPress={changeEmail} />

      <Button title="Changer de mot de passe" onPress={changePassword} />

      <Button title="Se déconnecter" onPress={signOutUser} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#77B5FE',
      padding: 8,
    }
  });

export default MonCompteScreen;