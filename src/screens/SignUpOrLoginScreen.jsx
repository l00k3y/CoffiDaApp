import 'react-native-gesture-handler';
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Image } from 'react-native-elements';
// import { getSessionData } from '../utils/LoginHelper';
import LoadingScreen from './LoadingScreen';

export default class SignUpOrLoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
    };
  }

  // componentDidMount() {
  //   const { navigation } = this.props;
  //   this.focusListener = navigation.addListener('focus', () => {
  //     getSessionData()
  //       .then((x) => {
  //         // this.setState({ isLoading: false });
  //         if (x.token !== null) {
  //           // console.log(x);
  //           this.props.navigation.navigate('MainApp');
  //           ToastAndroid.show('Welcome back!', ToastAndroid.SHORT);
  //         }
  //       });
  //   });
  // }

  // componentWillUnmount() {
  // // Remove the event listener
  //   if (this.focusListener != null && this.focusListener.remove) {
  //     this.focusListener.remove();
  //   }
  // }

  // componentDidMount() {
  //   this.focusListener = navigation.addListener('focus', () => {
  //   getSessionData()
  //     .then((x) => {
  //       this.setState({ isLoading: false });
  //       if (x.token !== null) {
  //         this.props.navigation.navigate('MainApp');
  //         ToastAndroid.show('Welcome back!', ToastAndroid.SHORT);
  //       }
  //     });
  //   }
  // }

  // componentWillUnmount() {
  //   // Remove the event listener
  //   if (this.focusListener != null && this.focusListener.remove) {
  //     this.focusListener.remove();
  //   }
  // }

  render() {
    const { navigation } = this.props;
    const stateEles = this.state;
    if (stateEles.isLoading) {
      return (
        <LoadingScreen />
      );
    }

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
