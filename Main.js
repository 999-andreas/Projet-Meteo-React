import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

import CurrentWeather from "./components/currentWeather"
import Forecasts from "./components/Forecasts"
import Search from './components/SearchBar';
import { fetchWeather } from './weatherApi';
import NavBar from './components/NavBar';
import MonCompteScreen from './MonCompte';

//implémentation des coordonnées dans l'API
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9cceaa071674faa23e4fc606cf7a6c1d&lang=fr&units=metric`

export default function App({ navigation, route }) {

//Récupération des coordonnées de user
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // État pour la ville sélectionnée
  const userUid = route.params?.uid;

  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync();
      updateWeather(userLocation.coords.latitude, userLocation.coords.longitude);
    };
    getCoordinates();
  }, []);

 // Fonction pour mettre à jour la météo
 const updateWeather = async (lat, lon) => {
  setLoading(true);
  const weatherData = await fetchWeather(lat, lon);
  setData(weatherData);
  setLoading(false);
};

//fonction de mise à jour des infos de météo en fonction de la ville selectionnée
const onCitySelect = (city) => {
  setSelectedCity(city);
  updateWeather(city.latitude, city.longitude);
};

//fonction de retour à la position de l'utilisateur
const handleGetCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // Gérer le cas où les permissions ne sont pas accordées
    return;
  }

  const userLocation = await Location.getCurrentPositionAsync();
  updateWeather(userLocation.coords.latitude, userLocation.coords.longitude);
};

const goToFavoris = async () => {
  let auth= route.params.auth;
  auth = auth.currentUser;
  auth = auth.uid;

  const database= route.params.database;


  if (userUid) {
    navigation.navigate('Favoris', { userUid });
  } else {
    // Gérez le cas où les paramètres ne sont pas passés ou auth est undefined
    console.error('Authentification requise');
    // Vous pouvez choisir de renvoyer l'utilisateur à l'écran de connexion
    // ou afficher un message d'erreur, selon le comportement souhaité.
  }
}

//affichage d'un chargement pendant la récupération de la position gps
  if (loading) {
    return <View style={styles.container}>
          <Text style={styles.chargement}>Chargement de la localisation</Text>
      <ActivityIndicator />
    </View>
  }

  return (
    <View style={styles.container}>
      <Search onCitySelect={onCitySelect} data={data} />
      <ScrollView>
        <CurrentWeather data={data} />
        <Forecasts data={data} />
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.roundButton}
            icon={
              <Icon
                name="location-arrow" // Nom de l'icône, peut varier selon la bibliothèque d'icônes
                size={30}
                color="white"
              />
            }
            onPress={handleGetCurrentLocation}
          />
        </View>
      </ScrollView>
      <NavBar data={data} auth={route.params.auth} database={route.params.database} navigation={navigation}/>
      <Button
        title="vers les favoris"
        onPress={goToFavoris} // Exemple de valeurs pour latitude et longitude
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#77B5FE',
    padding: 8,
  },
  chargement: {
    textAlign: 'center',
    //propriétés pour texte de chargement
  },
  buttonContainer: {
    position: 'absolute',
    left: "80%",
    bottom: "35%",
  },
  roundButton: {
    borderRadius: 30, // Rend le bouton rond
    width: 60,  // Définir la taille du bouton
    height: 60, // Définir la taille du bouton
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6092CD'
  },

});