import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListShopScreen from '../screens/coffeeShops/ListShopScreen';
import ShopDetailsScreen from '../screens/coffeeShops/ShopDetailsScreen';
import ShopReviewsScreen from '../screens/coffeeShops/ShopReviewsScreen';
import AddReviewScreen from '../screens/coffeeShops/AddReviewScreen';
import ReviewDetailsScreen from '../screens/coffeeShops/ReviewDetailsScreen';
import CameraScreen from '../screens/camera/CameraScreen';
import SearchShopsScreen from '../screens/coffeeShops/SearchShopsScreen';

const Stack = createStackNavigator();

export default function CoffeeShopNav() {
  return (
    <Stack.Navigator
      initialRouteName="ListShops"
      screenOptions={{ headerStyle: { backgroundColor: '#ECD2C7', elevation: 0 } }}
    >
      <Stack.Screen name="ListShops" component={ListShopScreen} options={{ headerShown: false }} initialParams={{ search: false }} />
      <Stack.Screen name="ShopDetails" component={ShopDetailsScreen} options={{ headerShown: false }} />
      {/* headerTitleAlign: 'center', headerTitle: 'Coffee Shop Details' */}
      <Stack.Screen name="ShopReviews" component={ShopReviewsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddReview" component={AddReviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ReviewDetails" component={ReviewDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SearchShops" component={SearchShopsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
