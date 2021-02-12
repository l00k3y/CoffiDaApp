/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import UpdateProfileScreen from '../screens/profile/UpdateProfile';

const Stack = createStackNavigator();

export default function ProfileNav() {
  //   const navigation = this.props.navigation;
  return (
  //   this.navigation.navigate('nextScreen')/
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} screenOptions={{ headerShown: true }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      {/* include edit details, profileScreen includes logout */}
      {/* My reviews */}
    </Stack.Navigator>
  );
}
