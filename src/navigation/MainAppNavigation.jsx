import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import ProfileNav from './ProfileNavigation';
import CoffeeShopNav from './CoffeeShopNavigation';
import ShopMapScreen from '../screens/coffeeShops/ShopMapScreen';

const Drawer = createDrawerNavigator();

export default function HomeNav() {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="Main App Landing" component={MainScreen} />
      <Drawer.Screen name="Coffee Shops" component={CoffeeShopNav} />
      <Drawer.Screen name="Coffee Shop Map" component={ShopMapScreen} />
      <Drawer.Screen name="Profile" component={ProfileNav} />
    </Drawer.Navigator>

  );
}
