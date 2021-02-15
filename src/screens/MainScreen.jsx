/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native-elements';

export default class MainScreen extends Component {
  render() {
    return (

      <View style={{
        flex: 1,
        backgroundColor: '#845D3E',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Image
          source={require('../assets/images/transpLogo2.png')}
          style={{ width: 150, height: 200 }}
        />

        <Text>Welcome! Swipe right to open the menu</Text>
      </View>
    );
  }
}
