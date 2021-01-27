/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// eslint-disable-next-line react/prefer-stateless-function
export default class LoginScreen extends Component {

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

    const navigation = this.props.navigation;

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
        
              {/* <Text>
                {' '}
                itemId:
                {JSON.stringify(itemId)}
              </Text>
              <Text>
                otherParam:
                {JSON.stringify(otherParam)}
        
              </Text> */}
        <View style={{ flex: 8 }}>

          <View style={{ width: '90%', marginLeft: '5%' }}>
          <Input
            placeholderTextColor='#36222D'
            value={this.state.email}
            onChangeText={this.handleEmailInput}
            /* Add theme manager and store this as base input for all input types*/
            containerStyle={{ marginTop: '10%' }}
            disabledInputStyle={{ background: '#ddd' }}
            inputContainerStyle={{ borderColor: '#ECD2C7' }}
            errorMessage="Invalid email address"
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
            errorMessage="Invalid password"
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
            titleStyle={{ color: '#36222D', textAlign: 'center' }} onPress={() => 
            /*  Validate inputs onChange of inputs, set valid to true when both email + pw are valid, 
                make API call for token, store token, show home screen */ 
            console.log('Email = ' + this.state.email + '\n Password = ' + this.state.password )
          } />

        </View>


      </View>
    
      </ScrollView>


    );
  }
}
