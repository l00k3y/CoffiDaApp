// login or sign up if no session token
// if there is token then send to HomeNavigation where initialRouteName is MainAppWelcome

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpOrLoginScreen from '../screens/SignUpOrLoginScreen';

import MainNav from './MainAppNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '', headerStyle: { backgroundColor: '#845D3E', elevation: 0 } }}>
        <Stack.Screen name="Landing" component={SignUpOrLoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={MainNav} options={{ headerShown: false }} />
        {/* needs to be main navigator */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
