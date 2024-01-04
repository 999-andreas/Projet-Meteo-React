import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './Authent'; // Assurez-vous de définir le chemin correct
import MeteoScreen from './Main';
import FavoriteLocationsScreen from './Favoris';
import AddFavoriteScreen from './components/NavBar';
import MonCompteScreen from './MonCompte'

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MeteoScreen} />
        <Stack.Screen name="NavBar" component={AddFavoriteScreen} />
        <Stack.Screen name="Favoris" component={FavoriteLocationsScreen} />
        <Stack.Screen name="Compte" component={MonCompteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;