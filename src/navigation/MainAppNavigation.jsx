import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import ProfileNav from './ProfileNavigation';
import CoffeeShopNav from './CoffeeShopNavigation';

const Drawer = createDrawerNavigator();

export default function HomeNav() {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="CoffeeShopMap" component={MainScreen} />
      <Drawer.Screen name="ListCoffeeShops" component={CoffeeShopNav} />
      <Drawer.Screen name="Profile" component={ProfileNav} />
    </Drawer.Navigator>

  );
}
