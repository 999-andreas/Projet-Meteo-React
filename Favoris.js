import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getFavoriteLocationsByUser } from './FavoriteManager'; // Importez votre gestionnaire de favoris

const FavoriteLocationsScreen = ({route}) => {
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  console.log(route);

  const auth = route.params.auth.userId;

  console.log("--------------------------");
  console.log(auth);

  //const { auth } = auth.currentUser;


  useEffect(() => {
    const fetchFavoriteLocations = async () => {
      if (auth) {
        const userID = auth;

        try {
          const favorites = await getFavoriteLocationsByUser(userID);
          if (favorites) {
            const favoriteLocationsArray = Object.values(favorites);
            setFavoriteLocations(favoriteLocationsArray);
          } else {
            console.log('Aucun lieu favori trouvé.');
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
    <View style={styles.container}>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
      <Text>localisation: {item.localisation}</Text>

    </View>
  );

  return (
    <View >
      <FlatList 
        data={favoriteLocations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
  });

export default FavoriteLocationsScreen;