/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

// eslint-disable-next-line react/prefer-stateless-function
export default class LoginInput extends Component {

  constructor(props){
    super(props);

    /* Send email and password in json object to API, API returns token, store token in async storage, set isSignedIn to true and load home page*/ 
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailInput = (email) => {
    //do validation here
    if (email.length < 1) {
      console.log("too short")
      console.log(email.length)
      this.setState({email:email})
    } else {
      this.setState({email:email})
      console.log(email);
    }
    
  }

  handlePasswordInput = (pass) => {
    //do validation here
    this.setState({password:pass})
  }

  render() {
    return (

      <View style={{ width: '90%', marginLeft: '5%' }}>
        <Input
          value={this.state.email}
          onChangeText={this.handleEmailInput}
          /* Add theme manager and store this as base input for all input types*/
          containerStyle={{ marginTop: '10%' }}
          disabledInputStyle={{ background: '#ddd' }}
          inputContainerStyle={{ color: '#36222D' }}
          errorMessage="Invalid email address"
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{ color: '#36222D' }}
          label="Email Address"
          labelStyle={{ color: '#36222D' }}
          labelProps={{}}
          leftIcon={<Icon name="account-outline" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={{}}
          rightIconContainerStyle={{}}
          placeholder="email@address.com"
        />

        <Input
          onChangeText={this.handlePasswordInput}
          containerStyle={{ marginTop: '5%' }}
          disabledInputStyle={{ background: '#ddd' }}
          inputContainerStyle={{}}
          errorMessage="Invalid password"
          errorStyle={{}}
          errorProps={{}} /* isValidPassword */
          inputStyle={{}}
          label="Password"
          labelStyle={{ color: '#36222D' }}
          labelProps={{}}
          leftIcon={<Icon name="account-outline" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={{}}
          rightIconContainerStyle={{}}
          placeholder="Password"
          secureTextEntry
        />
          
        <Button title="Login" buttonStyle={{
            width: '100%', backgroundColor: '#ECD2C7', marginTop:'10%'
          }}
          titleStyle={{ color: '#36222D', textAlign: 'center' }} onPress={() => 
          /*  Validate inputs onChange of inputs, set valid to true when both email + pw are valid, 
              make API call for token, store token, show home screen */ 
          console.log('Email = ' + this.state.email + '\n Password = ' + this.state.password )
        } />

      </View>

    );
  }
}
