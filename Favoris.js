import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getFavoriteLocationsByUser } from './FavoriteManager'; // Importez votre gestionnaire de favoris

const FavoriteLocationsScreen = ({navigation, route}) => {
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  console.log(route);

  const auth = route.params.auth.userId;

  //console.log("--------------------------");
  //console.log(auth);

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
    <View style={styles.itemListe}>
        <Text style={{fontSize: 30, fontWeight: "400", textAlign: 'center',}}>{item.localisation}</Text>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
    </View>
  );

  return (
    <View  style={styles.container}>
        <Button 
            icon={<Icon
                name="arrow-left"
                type="font-awesome"
                size={15}
                color="white"/>}
            buttonStyle={styles.buttonBack}
            containerStyle={styles.backButtonContainer}
            onPress={() => navigation.goBack()}
/>
        <Text style={styles.title}>Favoris</Text>
        <View style={styles.liste}>
            <FlatList 
            data={favoriteLocations}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: "500",
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#77B5FE',
      padding: 8,
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
    },
    itemListe: {
        backgroundColor: 'rgba(96, 146, 205, 0.95)', //couleur et transparence
        padding: 20,
        elevation: 5,
        alignItems: 'center',
        marginTop: '2%',
        borderRadius: 10,
        width: '100%',
      },
  });

export default FavoriteLocationsScreen;