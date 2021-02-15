import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import LoadingScreen from '../LoadingScreen';

export default class UpdateProfileScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      originalUser: {},
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      loginObject: {},
      isLoading: true,
    };
  }

  onSubmit() {
    this.validate({
      firstName: { required: true },
      lastName: { required: true },
      email: { required: true, email: true },
      password: { required: true, minlength: 5 },
      confirmPass: { required: true, equalPassword: this.state.password }
    });
  }

  async componentDidMount() {
    this.state.loginObject = await getSessionData();
    this.populateForm();
  }

  handleFirstNameInput = (inpFirstName) => {
    this.setState({ firstName: inpFirstName });
  }

  handleLastNameInput = (inpLastName) => {
    this.setState({ lastName: inpLastName });
  }

  handleEmailInput = (inpEmail) => {
    this.setState({ email: inpEmail });
  }

  handlePasswordInput = (pass) => {
    this.setState({ password: pass });
  }

  handleConfirmPasswordInput = (pass) => {
    this.setState({ confirmPass: pass });
  }

  buildProfileDetails() {
    const toSend = {};
    if (this.state.first_name !== this.state.originalUser.first_name) {
      toSend.first_name = this.state.firstName;
    }
    if (this.state.last_name !== this.state.originalUser.last_name) {
      toSend.last_name = this.state.lastName;
    }
    if (this.state.email !== this.state.originalUser.email) {
      toSend.email = this.state.email;
    }
    if ((this.state.password !== this.state.originalUser.password) && (this.state.password === this.state.confirmPass)) {
      toSend.password = this.state.password;
    }
    return toSend;
  }

  async updateProfile() {

    this.onSubmit()
    if (this.isFormValid()) {
      try {
        const response = await fetch(`http://10.0.2.2:3333/api/1.0.0/user/${this.state.loginObject.id}`, {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.loginObject.token,
          },
          body: JSON.stringify(this.buildProfileDetails()),
        });
        if (response.status === 200) {
          ToastAndroid.show('Updated!', ToastAndroid.SHORT);
        } else if (response.status === 400) {
          ToastAndroid.show('Failed validation', ToastAndroid.SHORT);
        } else if (response.status === 401) {
          ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
        } else if (response.status === 403) {
          ToastAndroid.show('Forbidden request', ToastAndroid.SHORT);
        } else if (response.status === 404) {
          ToastAndroid.show('User not found', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Server error', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    } if (!this.isFormValid()) {
      ToastAndroid.show(this.getErrorMessages("\n"), ToastAndroid.SHORT);
    } 
  }

  async populateForm() {
    try {
      const response = await fetch(`http://10.0.2.2:3333/api/1.0.0/user/${this.state.loginObject.id}`, {
        headers: {
          'X-Authorization': this.state.loginObject.token,
        },
      });
      if (response.status === 200) {
        return response.json();
      } if (response.status === 401) {
        ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
      } else if (response.status === 404) {
        ToastAndroid.show('User not found', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Server error', ToastAndroid.SHORT);
      }
      const responseJson = undefined;
      this.setState({
        originalUser: responseJson,
        firstName: responseJson.first_name,
        lastName: responseJson.last_name,
        email: responseJson.email,
        isLoading: false,
      });
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <View style={{
          flex: 1, marginTop: '5%', width: '90%', height: '100%',
        }}
        >
          <Input
            value={this.state.firstName}
            onChangeText={this.handleFirstNameInput}
            inputStyle={{ color: '#36222D' }}
            label="First Name"
            labelStyle={{ color: '#36222D' }}
            leftIcon={<Icon name="account" size={20} />}
            placeholder="Alan"
          />

          <Input
            value={this.state.lastName}
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

          <Button
            title="Update"
            buttonStyle={{
              width: '100%', backgroundColor: '#ECD2C7',
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }}
            onPress={() => this.updateProfile()}
          />
        </View>

      </ScrollView>
    );
  }
}
