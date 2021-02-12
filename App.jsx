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
      loginObject: {},
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    getSessionData()
      .then((x) => {
        this.setState({ loginObject: x, ready: true });
        if (x !== null) {
          // send to main app
          // navigation.navigate('Main');
          ToastAndroid.show('Welcome back!', ToastAndroid.SHORT);
          // return (<MainScreen />);
        }
        // send to sign up or login
      });
  }

  render() {
    if (this.state.ready === false) {
      return <LoadingScreen />;
    }
    return (<App />);
  }
}

export default CoffiDaApp;
