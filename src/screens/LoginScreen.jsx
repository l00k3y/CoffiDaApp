/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { setSessionData } from '../utils/LoginHelper'

// eslint-disable-next-line react/prefer-stateless-function
export default class LoginScreen extends ValidationComponent {

  constructor(props){
    super(props);

    /* Send email and password in json object to API, API returns token, store token in async storage, set isSignedIn to true and load home page */ 
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailInput = (inpEmail) => {
      this.setState({email: inpEmail})
  }

  handlePasswordInput = (pass) => {
    // do validation here
    this.setState({password:pass})
  }

  onSubmit() {
    this.validate({
      email: {required: true, email: true },
      password: {minlength: 5, required: true},
    });
    console.log(this.getErrorMessages());
  }

  async login() {

    this.onSubmit();
    
    if(this.isFormValid()) {
      return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } if (response.status === 400) {
          throw 'Invalid credentials';
        } else {
          throw 'Server error';
        }
      })
      .then(async (responseJson) => {
        const loginObject = {};
        loginObject.id = JSON.stringify(responseJson.id)
        loginObject.token = responseJson.token
        setSessionData(loginObject);
        this.props.navigation.navigate('Main');
        ToastAndroid.show("Welcome", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      });
    } 
    const errMessage = this.getErrorMessages('\n');
    ToastAndroid.show(errMessage, ToastAndroid.SHORT);
  }

  render() {

    const {navigation} = this.props;

    return (
      <ScrollView style={{
        flex: 1, backgroundColor: '#845D3E', alignContent: 'center',
        }}>
          <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/images/transpLogo2.png')}
              style={{ width: 150, height: 200 }}
            />
          </View>

        <View style={{ flex: 8 }}>

          <View style={{ width: '90%', marginLeft: '5%' }}>
          <Input
            placeholderTextColor='#36222D'
            value={this.state.email}
            onChangeText={this.handleEmailInput}
            /* Add theme manager and store this as base input for all input types */
            containerStyle={{ marginTop: '10%' }}
            disabledInputStyle={{ background: '#ddd' }}
            inputContainerStyle={{ borderColor: '#ECD2C7' }}
            errorMessage="Required. Must be valid email"
            errorStyle={{}}
            errorProps={{}}
            inputStyle={{ color: '#36222D' }}
            label="Email Address"
            labelStyle={{ color: '#36222D' }}
            labelProps={{}}
            leftIcon={<Icon name="email" size={20} />}
            leftIconContainerStyle={{}}
            rightIcon={{}}
            rightIconContainerStyle={{}}
            placeholder="email@address.com"
          />

          <Input
            placeholderTextColor='#36222D'
            onChangeText={this.handlePasswordInput}
            containerStyle={{ marginTop: '5%' }}
            disabledInputStyle={{ background: '#ddd' }}
            inputContainerStyle={{ borderColor: '#ECD2C7' }}
            errorMessage="Required. Must have more than 4 characters"
            errorStyle={{}}
            errorProps={{}} /* isValidPassword */
            inputStyle={{}}
            label="Password"
            labelStyle={{ color: '#36222D' }}
            labelProps={{}}
            leftIcon={<Icon name="lock" size={20} />}
            leftIconContainerStyle={{}}
            rightIcon={{}}
            rightIconContainerStyle={{}}
            placeholder="Password"
            secureTextEntry
          />
            
          <Button title="Login" buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7', marginTop:'10%'
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }} onPress={() => this.login()}
            /*  Validate inputs onChange of inputs, set valid to true when both email + pw are valid, 
                make API call for token, store token, show home screen */ 
            // console.log('Email = ' + this.state.email + '\n Password = ' + this.state.password )
           />

        </View>


      </View>
    
      </ScrollView>


    );
  }
}
