/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class SignUpInput extends Component {
  constructor(props) {
    super(props);

    /*
        Validate details
        Send details in json object to API
        API checks for existing email
        if none in db then create account
        show error if otherwise
        show toast saying account created
        show home
    */
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPass: '',
    };
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

  handleConfirmPasswordInput = (pass) => {
    //more validation
    this.setState({confirmPass:pass})

  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor:'#845D3E'}} contentContainerStyle={{justifyContent: 'space-evenly', alignItems: 'center'}}>
        <View style={{width:'90%'}}>
            <Input
            value={this.state.first_name}
            onChangeText={this.handleEmailInput}
            inputStyle={{ color: '#36222D' }}
            label="First Name"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account-outline" size={20} />}
            placeholder="Alan"
            />

            <Input
            value={this.state.last_name}
            onChangeText={this.handleEmailInput}
            inputStyle={{ color: '#36222D' }}
            label="Last Name"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account-outline" size={20} />}
            placeholder="Shearer"
            />

            <Input
            value={this.state.email}
            onChangeText={this.handleEmailInput}
            inputStyle={{ color: '#36222D' }}
            label="Email Address"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account-outline" size={20} />}
            placeholder="email@address.com"
            />

            <Input
            value={this.state.password}
            onChangeText={this.handlePasswordInput}
            inputStyle={{ color: '#36222D' }}
            label="Password"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account-outline" size={20} />}
            placeholder="Password"
            secureTextEntry
            />

            <Input
            value={this.state.confirmPass}
            onChangeText={this.handleConfirmPasswordInput}
            inputStyle={{ color: '#36222D' }}
            label="Confirm Password"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account-outline" size={20} />}
            placeholder="Confirm Password"
            secureTextEntry
            />

            <Button title="Sign Up" 
                buttonStyle={{
                    width: '100%', backgroundColor: '#ECD2C7',
                  }}
                titleStyle={{ color: '#36222D', textAlign: 'center' }}
                onPress={() => 
                /*  
                    Validate inputs onChange of inputs, set valid to true when both email + pw are valid, 
                    make API call for token, store token, show home screen
                */ 
                console.log('Email = ' + this.state.email + '\n Password = ' + this.state.password )
                } 
            />
        </View>

      </ScrollView> 
    );
  }
}
