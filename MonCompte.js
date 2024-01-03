import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

const MonCompteScreen = ({route}) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { auth } = route.params.auth;

  const changeEmail = () => {
    const user = auth.currentUser;

    user.updateEmail(newEmail).then(() => {
      Alert.alert('Success', 'Adresse e-mail mise à jour avec succès');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const changePassword = () => {
    const user = auth().currentUser;

    user.updatePassword(newPassword).then(() => {
      Alert.alert('Success', 'Mot de passe mis à jour avec succès');
    }).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const signOut = () => {
    auth().signOut().then(() => {
      // Redirection vers l'écran de connexion, par exemple
    }).catch((error) => {
      Alert.alert('Error', error.message);
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

      <TextInput
        placeholder="Nouveau mot de passe"
        secureTextEntry={true}
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
      />
      <Button title="Changer de mot de passe" onPress={changePassword} />

      <Button title="Se déconnecter" onPress={signOut} />
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