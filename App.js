import 'react-native-gesture-handler';
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import LoginInput from './src/components/loginInput';
import SignUpInput from './src/components/signUpInput';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainView}>
      <View style={{ flex: 4 }}>
        <Image
          source={require('./src/assets/images/transpLogo2.png')}
          style={{ width: 150, height: 200 }}
        />
      </View>

      {/* <View style={{width:'100%', alig}} */}
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

function LoginScreen({ route, navigation }) {
  // LoginScreen.propTypes = {
  //   itemId: PropTypes.number,
  //   otherParam: PropTypes.string
  // };

  const { itemId, otherParam } = route.params;

  return (
    <View style={{
      flex: 1, backgroundColor: '#845D3E', alignContent: 'center',
    }}
    >
      <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('./src/assets/images/transpLogo2.png')}
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
        <LoginInput />
      </View>

    </View>
  );
}

const Stack = createStackNavigator();

class CoffiDaApp extends Component {
  render() {
    return (
      <NavigationContainer>
        {/* elevation: 0 hides bottom border on Android */}
        <Stack.Navigator screenOptions={{ headerTitle: '', headerStyle: { backgroundColor: '#845D3E', elevation: 0 } }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpInput} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#845D3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
  },
  buttonStyle: {
    backgroundColor: '#845D3E',
    borderColor: '#36222D',
    borderWidth: 1,
    borderRadius: 8,
    padding: '1%',
    marginTop: '500%',
    width: '30%',
    alignItems: 'center',
  },
});

export default CoffiDaApp;
