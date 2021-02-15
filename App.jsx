import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';

import { getSessionData } from './src/utils/LoginHelper';

import App from './src/navigation/MainNavigation';
import LoadingScreen from './src/screens/LoadingScreen';

class CoffiDaApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      // loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        this.setState({ ready: true });
        if (x.token !== null) {
          console.log(x);
          ToastAndroid.show('Welcome back!', ToastAndroid.SHORT);
        }
      });
  }

  // isLoggedIn() {
  //   getSessionData()
  //     .then((x) => {
  //       console.log(x);
  //       this.setState({ loginObject: x, });
  //       if (x.token !== null) {
  //         // this.navigation.navigate('Main');
  //         // return (<MainScreen />);
  //       }
  //       // send to sign up or login
  //     });
  // }

  render() {
    if (this.state.ready === false) {
      return <LoadingScreen />;
    }
    return (<App />);
  }
}

export default CoffiDaApp;
