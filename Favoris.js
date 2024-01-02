import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import FavoriteManager from './FavoriteManager'; // Importez votre gestionnaire de favoris

const FavoriteLocationsScreen = ({auth}) => {
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  
  //const { auth } = auth.currentUser;


  useEffect(() => {
    const fetchFavoriteLocations = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userID = currentUser.uid;

        try {
          const favorites = await new FavoriteManager().getFavoriteLocationsByUser(userID);
          if (favorites) {
            const favoriteLocationsArray = Object.values(favorites);
            setFavoriteLocations(favoriteLocationsArray);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des lieux favoris (Favoris.js): ', error);
        }
      } else {
        console.error('Utilisateur non connecté.');
      }
    };

    fetchFavoriteLocations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={favoriteLocations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FavoriteLocationsScreen;
