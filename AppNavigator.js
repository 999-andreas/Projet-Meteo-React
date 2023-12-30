import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './Authent'; // Assurez-vous de définir le chemin correct
import MeteoScreen from './Main';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MeteoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;