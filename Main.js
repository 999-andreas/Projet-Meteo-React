import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from "axios"

import CurrentWeather from "./components/currentWeather"
import Forecasts from "./components/Forecasts"

//implémentation des coordonnées dans l'API
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9cceaa071674faa23e4fc606cf7a6c1d&lang=fr&units=metric`

export default function App() {

//Récupération des coordonnées de user
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };

    getCoordinates();
  }, []);

  //2 : réaliser une requête vers notre serveur

  // city
  // météo du moment
  // prévisions

//Renvoi des données depuis le call de L'API
  const getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

      setData(response.data)
      setLoading(false)

    } catch(e) {
      console.log("Erreur dans getWeather")
    }
   
  };

//affichage d'un chargement pendant la récupération de la position gps
  if (loading) {
    return <View style={styles.container}>
          <Text>Chargement de la localisation</Text>
      <ActivityIndicator />

    </View>
    
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#77B5FE',
    padding: 8,
  },
});