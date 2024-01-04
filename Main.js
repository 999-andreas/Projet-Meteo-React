import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from "axios"

import CurrentWeather from "./components/currentWeather"
import Forecasts from "./components/Forecasts"
import Search from './components/SearchBar';
import { fetchWeather } from './weatherApi';

//implémentation des coordonnées dans l'API
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9cceaa071674faa23e4fc606cf7a6c1d&lang=fr&units=metric`

export default function App() {

//Récupération des coordonnées de user
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // État pour la ville sélectionnée

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

const onCitySelect = (city) => {
  setSelectedCity(city);
  updateWeather(city.latitude, city.longitude); // Mettez à jour la météo pour la ville sélectionnée
};

//affichage d'un chargement pendant la récupération de la position gps
  if (loading) {
    return <View style={styles.container}>
          <Text style={styles.chargement}>Chargement de la localisation</Text>
      <ActivityIndicator />
    </View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
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
      </View>
      <View style={{backgroundColor: '#6092CD'}}>
        <NavBar data={data}
              auth={route.params}
              database={route.params.database}
              navigation={navigation}
              style={{backgroundColor: '#6092CD'}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#77B5FE',
  },
  mainContent: {
    flex: 1,
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
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6092CD'
  },

});