import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

export default function Weather({ forecast }) {
  return (
    <View style={styles.container}>
      <Text>{forecast.hour}h</Text>
      <Image 
        source={{ uri: getIcon(forecast?.icon) }}
        style={styles.image}
      />
      <Text style={styles.temp}>{forecast.temp}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 75,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: '#6092CD',
  },

  image: {
    width: 50,
    height: 50
  },

  temp: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
