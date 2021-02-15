import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import ProfileNav from './ProfileNavigation';
import CoffeeShopNav from './CoffeeShopNavigation';

const Drawer = createDrawerNavigator();

export default function HomeNav() {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="Coffee Shop Map" component={MainScreen} />
      <Drawer.Screen name="List Coffee Shops" component={CoffeeShopNav} />
      {/* <Tab.Screen name="List" component={MainScreen} /> */}
      <Drawer.Screen name="Profile" component={ProfileNav} />
      {/* <Tab.Screen name="About" component={MainScreen} /> */}
    </Drawer.Navigator>

  );
}
