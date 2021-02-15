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
      screenOptions={{ headerStyle: { backgroundColor: '#ECD2C7', elevation: 0 } }}
      // screenOptions={{ headerShown: false }} ECD2C7
    >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{ headerTitleAlign: 'center', headerTitle: 'Update Profile'}} />
      {/* include edit details, profileScreen includes logout */}
      {/* My reviews */}
    </Stack.Navigator>
  );
}
