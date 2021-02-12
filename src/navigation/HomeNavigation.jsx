// coffee shops
// profile
// about
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainScreen from '../screens/MainScreen';
import ProfileNav from './ProfileNavigation';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeNav() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
    >
      <Tab.Screen name="Map" component={MainScreen} />
      {/* <Tab.Screen name="List" component={MainScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileNav} />
      {/* <Tab.Screen name="About" component={MainScreen} /> */}
    </Tab.Navigator>

  );
}
