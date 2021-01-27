import 'react-native-gesture-handler';
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import SignUpInput from './src/screens/SignUpScreen';
import LandingScreen from './src/screens/LandingScreen';

const Stack = createStackNavigator();

class CoffiDaApp extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <NavigationContainer>
        {/* elevation: 0 hides bottom border on Android */}
        <Stack.Navigator screenOptions={{ headerTitle: '', headerStyle: { backgroundColor: '#845D3E', elevation: 0 } }}>
          <Stack.Screen name="Home" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpInput} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#845D3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
  },
  buttonStyle: {
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
    marginTop: '500%',
    width: '30%',
    alignItems: 'center',
  },
});

export default CoffiDaApp;
