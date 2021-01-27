import 'react-native-gesture-handler';
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Image } from 'react-native-elements';

export default class LandingScreen extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#845D3E',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >

        <View style={{ flex: 4 }}>
          <Image
            source={require('../assets/images/transpLogo2.png')}
            style={{ width: 150, height: 200 }}
          />
        </View>

        <View style={{ flex: 3, justifyContent: 'space-evenly' }}>
          <Button
            title="Log In"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => navigation.navigate('Login', {
            // itemId: 86,
            // otherParam: 'this is my first passed parameter',
            })}
          />
          <Button
            title="Sign Up"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => navigation.navigate('SignUp')}
          />

        </View>

      </View>
    );
  }
}
