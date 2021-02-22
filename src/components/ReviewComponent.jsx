import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ListItem, AirbnbRating } from 'react-native-elements';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

function ReviewItemComponent(props) {
  const navigation = useNavigation();
  const propEles = props;

  function navigateToReviewDetails() {
    // console.log(propEles);
    navigation.navigate('ReviewDetails', { reviewData: propEles.review_data, shopIdentifier: propEles.shopID });
    // console.log(props);
    // if (props.profile) {
    //   navigation.navigate('ProfileShopDetails', { reviewData: propEles });
    // } else {
    //   navigation.navigate('ShopDetails', { reviewData: propEles });
    // }
  }

  return (
    <ListItem
      bottomDivider
      Component={TouchableHighlight}
      containerStyle={{ backgroundColor: '#F6DFD7' }}
      disabledStyle={{ opacity: 0.5 }}
      onPress={() => navigateToReviewDetails()}
      pad={10}
      topDivider
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text>{propEles.review_data.review_body}</Text>
        </ListItem.Title>
      </ListItem.Content>

      <AirbnbRating
        size={10}
        count={5}
        defaultRating={propEles.review_data.overall_rating}
        reviews={[
          'Terrible',
          'Bad',
          'Okay',
          'Good',
          'Great',
        ]}
        showRating
        isDisabled
      />
    </ListItem>
  );
}

export default ReviewItemComponent;
