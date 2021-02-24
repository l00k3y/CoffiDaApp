import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ListItem, AirbnbRating } from 'react-native-elements';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

function ReviewItemComponent(props) {
  const reviewComponentNav = useNavigation();
  const propEles = props;

  function navigateToReviewDetails() {
    if (propEles.update) {
      reviewComponentNav.navigate('UpdateMyReview', { reviewData: propEles.review_data, locationData: propEles.location_data, shopIdentifier: propEles.shopID });
    } else if (propEles.profile) {
      reviewComponentNav.navigate('ProfileReviewDetails', { reviewData: propEles.review_data, shopIdentifier: propEles.shopID });
    } else {
      reviewComponentNav.navigate('ReviewDetails', { reviewData: propEles.review_data, shopIdentifier: propEles.shopID });
    }
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
