// login or sign up if no session token
// if there is token then send to HomeNavigation where initialRouteName is MainAppWelcome

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpOrLoginScreen from '../screens/SignUpOrLoginScreen';
// import LoadingScreen from './src/screens/LoadingScreen';

import MainNav from './HomeNavigation';

// import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerStyle: { backgroundColor: '#845D3E', elevation: 0 } }}>
        <Stack.Screen name="Home" component={SignUpOrLoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainNav} options={{ headerShown: false }} />
        {/* needs to be main navigator */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
