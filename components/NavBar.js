import React from 'react';
import { View, Button } from 'react-native';
import { getFavoriteLocationsByUser, addFavoriteLocation } from '../FavoriteManager';

const AddFavoriteScreen = ({navigation, data, auth, database }) => {
  const handleAddFavorite = (latitude, longitude, ville) => {
    if (!latitude || !longitude || !ville) {
      console.error('Veuillez fournir des valeurs valides pour latitude et longitude ainsi qu un nom de ville.');
      return;
    }

    addFavoriteLocation(ville, latitude, longitude, {auth, database})
      .then(() => {
        // Après avoir ajouté le favori, naviguez vers l'écran qui affiche la liste des favoris
        navigation.navigate('Favoris', {auth});
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du lieu favori : ', error);
      });
  };

  return (
    <View>
      {/* Bouton pour ajouter un favori */}
      <Button
        title="Ajouter un favori"
        onPress={() => handleAddFavorite(40.7128, -74.0060, "Paris")} // Exemple de valeurs pour latitude et longitude
      />
    </View>
  );
};

export default AddFavoriteScreen;
