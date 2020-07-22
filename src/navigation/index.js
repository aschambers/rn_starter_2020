import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Dashboard } from '../screens';
import { Signup, Login } from '../components'

// used to logout user using store
import configureStore from '../redux/store';
export const store = configureStore();

const Stack = createStackNavigator();

MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default createAppContainer = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
