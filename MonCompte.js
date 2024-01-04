import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
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
        <Button 
        icon={
            <Icon
              name="arrow-left"
              type="font-awesome"
              size={15}
              color="white"
            />
          }
        buttonStyle={styles.buttonBack}
        containerStyle={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouvelle adresse e-mail"
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
      />
      <Button title="Changer d'e-mail" onPress={changeEmail} buttonStyle={styles.button} />

      <Button title="Changer de mot de passe" onPress={changePassword} buttonStyle={styles.button}/>

      <Button title="Se déconnecter" onPress={signOutUser} buttonStyle={styles.button}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#77B5FE',
        padding: 8,
    },
    input: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6092CD'
    },
    backButtonContainer: {
        position: 'absolute', 
        top: 50, 
        left: 10,
        zIndex: 1,
    },
    buttonBack: {
        borderRadius: 30, // Rend le bouton rond
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6092CD'
    }
  });

export default MonCompteScreen;