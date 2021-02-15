import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListShopScreen from '../screens/coffeeShops/ListShopScreen'
import ShopDetailsScreen from '../screens/coffeeShops/ShopDetailsScreen';

const Stack = createStackNavigator();

export default function CoffeeShopNav() {
  return (
    <Stack.Navigator
      initialRouteName="ListShops"
      screenOptions={{ headerStyle: { backgroundColor: '#ECD2C7', elevation: 0 } }}
    >
      <Stack.Screen name="ListShops" component={ListShopScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ShopDetails" component={ShopDetailsScreen} options={{ headerTitleAlign: 'center', headerTitle: 'Coffee Shop Details'}} />
    </Stack.Navigator>
  );
}
