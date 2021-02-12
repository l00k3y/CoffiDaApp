import 'react-native-gesture-handler';
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

export default class LoadingScreen extends Component {
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
      </View>
    );
  }
}
