import React, {useEffect, useState} from "react"
import {View, Text, Image, StyleSheet, Dimensions} from "react-native"
import {isSameDay} from "date-fns"

//récupération de l'image liée à la météo
const getIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@4x.png` 
const screenWidth = Dimensions.get('window').width;

export default function CurrentWeather({ data }) {
  const [currentWeather, setCurrentWeather] = useState(null)

  // vérification de la synchronisation de l'heure de l'API et de l'utilisateur
  useEffect(() => {
    const currentW = data.list.filter(forecast => {
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
      const forecastDate = new Date(forecast.dt * 1000)
      return isSameDay(today, forecastDate)
    })
    setCurrentWeather(currentW[0])

  }, [data])

  //Récupération et affichage des données de l'API avec la localisation
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.city}>{data?.city?.name}</Text>
        <Text style={styles.today}>Aujourd'hui</Text>
      </View>

      <View style={styles.rowDivided}>
        <View style={styles.leftColumn}>
          <View style={styles.bigInfo}>
            <Text style={styles.temp} >{Math.round(currentWeather?.main.temp)}°C</Text>
            <Text style={styles.tempRange}>↑{Math.round(currentWeather?.main?.temp_max)}°
            ↓{Math.round(currentWeather?.main?.temp_min)}° </Text>
            <Text style={styles.description}>{currentWeather?.weather[0].description?
              currentWeather.weather[0].description.charAt(0).toUpperCase() +
            currentWeather.weather[0].description.slice(1): ''} </Text>
            {/*<Text style={styles.description}>Partiellement nuageux</Text>*/}
          </View>

          <View>
              <Text style={styles.details}>
              Humidité : {currentWeather?.main?.humidity}%</Text>
              <Text style={styles.details}>
              Vent : {Math.round(currentWeather?.wind?.speed)} km/h </Text>
              <Text style={styles.details}>
              Ressenti : {Math.round(currentWeather?.main?.feels_like)}°</Text>
          </View>
        </View>
        <Image
            source={{uri: getIcon(currentWeather?.weather[0].icon)}}
            style={styles.image}
        />
      </View>
          
    </View>
  )
}

const COLOR = "#000000"

const styles = StyleSheet.create({
  container: {
    height: "65%",
    paddingBottom: 50,
  },

  title: {
    marginVertical: "5%",
    alignItems: "center",
  },

  rowDivided: {
    marginTop: "5%",
    flexDirection: 'row',
  },

  leftColumn: {
    
  },

  bigInfo: {
    alignItems: "center",
    marginLeft: 30,
    marginBottom: 30,
    flexWrap: 'wrap',
    width: screenWidth - screenWidth/2 - 40,
  },

  city: {
    fontSize: 50,
    fontWeight: "500",
    color: COLOR
  },

  today: {
    fontSize: 24,
    fontWeight: "300",
    color: COLOR,
  },

  image: {width:screenWidth - screenWidth/2, height: 200, marginTop: 10},

  temp: {
    fontSize: 60,
    fontWeight: "bold",
    color: COLOR,
  },

  description: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: COLOR,
    flexShrink: 1,
  },

  tempRange: {
    fontSize: 24,
    fontWeight: '400',
    color: COLOR,
    marginTop: 4,
  },

  details: {
    alignItems: "baseline",
    fontSize: 16,
    fontWeight: '400',
    color: COLOR,
    marginLeft: 40,
  },

})