import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import UpdateProfileScreen from '../screens/profile/UpdateProfile';
import FavouriteLocationsScreen from '../screens/profile/FavouriteLocationsScreen';
import ShopDetailsScreen from '../screens/coffeeShops/ShopDetailsScreen';
import ReviewDetailsScreen from '../screens/coffeeShops/ReviewDetailsScreen';
import MyReviewsScreen from '../screens/profile/MyReviewsScreen';
import UpdateMyReviewScreen from '../screens/profile/UpdateMyReviewScreen';

const Stack = createStackNavigator();

export default function ProfileNav() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerStyle: { backgroundColor: '#ECD2C7', elevation: 0 } }}
    >
      {/* // screenOptions={{ headerShown: false }} ECD2C7 */}

      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{ headerTitleAlign: 'center', headerTitle: 'Update Profile' }} />
      <Stack.Screen name="FavouriteLocations" component={FavouriteLocationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileShopDetails" component={ShopDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfReviewDetails" component={ReviewDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyReviews" component={MyReviewsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateMyReview" component={UpdateMyReviewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
