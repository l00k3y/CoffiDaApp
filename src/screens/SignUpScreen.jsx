/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ValidationComponent from 'react-native-form-validator';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class SignUpScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
    };
  }

  onSubmit() {
    this.validate({
      firstName: { required: true },
      lastName: { required: true },
      email: { required: true, email: true },
      password: { required: true, minlength: 6 },
      confirmPass: { required: true, equalPassword: this.state.password }
    });
  }

  handleFirstNameInput = (inpFirstName) => {
    this.setState({firstName: inpFirstName});
  }

  handleLastNameInput = (inpLastName) => {
    this.setState({lastName: inpLastName});
  }

  handleEmailInput = (inpEmail) => {
      this.setState({email: inpEmail})    
  }

  handlePasswordInput = (pass) => {
    this.setState({password:pass})
  }

  handleConfirmPasswordInput = (pass) => {
    this.setState({confirmPass:pass})
  }

  async signUp() {
    
    this.onSubmit()
    if (this.isFormValid()) {

      const toSend = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };

      try {
        return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          }, body: JSON.stringify(toSend),
        })
        .then((response) => {
          if(response.status === 201) {
            return response.json();
          } if(response.status === 400) {
            ToastAndroid.show(`Validation failed`, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(`Server error`, ToastAndroid.SHORT);
          }
        })
        .then((responseJson) => {
          ToastAndroid.show(`Please sign in`, ToastAndroid.SHORT);
          this.props.navigation.navigate('Login', {email: this.state.email}); // pass email as prop
        });
      } catch (error) {
        console.error(error);
      } 
    } if (!this.isFormValid()) {
      ToastAndroid.show(this.getErrorMessages("\n"), ToastAndroid.SHORT);
    } 
  }

  render() {

    const {navigation} = this.props;

    return (
      <ScrollView style={{ flex: 1, backgroundColor:'#845D3E'}} contentContainerStyle={{justifyContent: 'space-evenly', alignItems: 'center'}}>
        <View style={{width:'90%'}}>
            <Input
            value={this.state.first_name}
            onChangeText={this.handleFirstNameInput}
            inputStyle={{ color: '#36222D' }}
            label="First Name"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account" size={20} />}
            placeholder="Alan"
            />

            <Input
            value={this.state.last_name}
            onChangeText={this.handleLastNameInput}
            inputStyle={{ color: '#36222D' }}
            label="Last Name"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account" size={20} />}
            placeholder="Shearer"
            />

            <Input
            value={this.state.email}
            onChangeText={this.handleEmailInput}
            inputStyle={{ color: '#36222D' }}
            label="Email Address"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="email" size={20} />}
            placeholder="email@address.com"
            />

            <Input
            value={this.state.password}
            onChangeText={this.handlePasswordInput}
            inputStyle={{ color: '#36222D' }}
            label="Password"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="lock" size={20} />}
            placeholder="Password"
            secureTextEntry
            />

            <Input
            value={this.state.confirmPass}
            onChangeText={this.handleConfirmPasswordInput}
            inputStyle={{ color: '#36222D' }}
            label="Confirm Password"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="lock" size={20} />}
            placeholder="Confirm Password"
            secureTextEntry
            />

            <Button title="Sign Up" 
                buttonStyle={{
                    width: '100%', backgroundColor: '#ECD2C7',
                  }}
                titleStyle={{ color: '#36222D', textAlign: 'center' }}
                onPress={() => this.signUp()} 
            />
        </View>

      </ScrollView> 
    );
  }
}
