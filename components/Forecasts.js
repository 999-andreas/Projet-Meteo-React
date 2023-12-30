import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import Weather from './Weather'

export default function Forecasts({ data }) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const forecastsData = data.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr })
      };
    });

  let newForecastsData = forecastsData.map(forecast => {
    return forecast.name
  }).filter((day, index, self) => {
  // return true
    return self.indexOf(day) === index // / 2 === 3
  }).map((day) => {
  // if day: name, data: [ forecast, forecast ]
    return {
      day,
      data: forecastsData.filter((forecast) => forecast.name === day)
    }
  })


    setForecasts(newForecastsData);
  }, [data])

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {forecasts.map((f) => (
        <View key={f.day}>
          <Text style={styles.day}>{f.day.charAt(0).toUpperCase() + f.day.slice(1)}</Text>
          <View style={styles.container}>
          {f.data.map(w => <Weather key={`${w.date.getTime()}-${w.hour}`} forecast={w} />)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  day: {
    fontSize:16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5
  },

  container: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 15,
  }
})