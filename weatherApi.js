import axios from 'axios';

// Fonction pour récupérer la météo actuelle
export const fetchWeather = async (lat, lon) => {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9cceaa071674faa23e4fc606cf7a6c1d&lang=fr&units=metric`
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};