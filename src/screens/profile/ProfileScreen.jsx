/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { getSessionData, clearSessionData } from '../../utils/LoginHelper';
import { commonStyles } from "../../styles/common";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        this.setState({ loginObject: x });
      });
  }

  logout() {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'X-Authorization': this.state.loginObject.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          clearSessionData();
          ToastAndroid.show('Goodbye!', ToastAndroid.SHORT);
          this.props.navigation.navigate('Home');
        } else if (response.status === 401) {
          ToastAndroid.show("Weren't logged in anyway!", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Server error', ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={commonStyles.mainView}>
        <View style={commonStyles.mainContentView}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
                source={require('../../assets/images/transpLogo2.png')}
                style={{ width: 150, height: 200 }}
              />
          </View>
        <Button
            title="My Reviews"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7', marginTop: '10%',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => console.log("")}
          />

          <Button
            title="My Favourite Locations"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7', marginTop: '10%',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => console.log("")}
          />


          <Button
            title="Update Profile"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7', marginTop: '10%',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => navigation.navigate('UpdateProfile')}
          />

          <Button
            title="Logout"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7', marginTop: '10%',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => this.logout()}
          />
        </View>
      </View>
      
    );
  }
}

// ProfileScreen.propTypes = {
//   navigation: PropTypes.shape.isRequired,
// };
