import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AuthScreen from './Authent'; // Assurez-vous de définir le chemin correct
import MeteoScreen from './Main';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MeteoScreen} />

        {/* Ajoutez d'autres écrans ici si nécessaire */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
