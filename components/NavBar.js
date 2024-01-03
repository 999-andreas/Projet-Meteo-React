import React from 'react';
import { View, Button } from 'react-native';
import { addFavoriteLocation } from '../FavoriteManager';


const AddFavoriteScreen = ({navigation, data, auth }) => {

    console.log("--------------------------navbar");
    console.log(data.city);
    const userID = auth.userId;

  const handleAddFavorite = (latitude, longitude, ville) => {
    if (!latitude || !longitude || !ville) {
      console.error('Veuillez fournir des valeurs valides pour latitude et longitude ainsi qu un nom de ville.');
      return;
    }

    console.log(auth);
    addFavoriteLocation(ville, latitude, longitude, userID)
      .then(() => {
        // Après avoir ajouté le favori, naviguez vers l'écran qui affiche la liste des favoris

        navigation.navigate('Favoris', {auth: auth});
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du lieu favori : ', error);
      });

  };

  const goToCompte = async () => {
    navigation.navigate('Compte', {auth: auth});
  }

  const goToFavoris = async () => {
    navigation.navigate('Favoris', {auth: auth} );
  } 

  return (
    <View>
      {/* Bouton pour ajouter un favori */}
      <Button
        title="Ajouter au favoris"
        onPress={() => handleAddFavorite(data.city.coord.lat, data.city.coord.lon, data.city.name)}
      />
      <Button
        title="vers mon compte"
        onPress={goToCompte}
      />
      <Button
        title="vers les favoris"
        onPress={goToFavoris}
      />
    </View>
  );
};

export default AddFavoriteScreen;