import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { ListItem, AirbnbRating } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

function CoffeeShopItemComponent(props) {
  const navigation = useNavigation();
  const propEles = props;

  function navigateToShopDetails() {
    if (props.profile) {
      navigation.navigate('ProfileShopDetails', { shopIdentifier: propEles.location_id });
    } else {
      navigation.navigate('ShopDetails', { shopIdentifier: propEles.location_id });
    }
  }

  return (
    <ListItem
      bottomDivider
      Component={TouchableHighlight}
      containerStyle={{ backgroundColor: '#F6DFD7' }}
      disabledStyle={{ opacity: 0.5 }}
      onPress={() => navigateToShopDetails()}
      pad={10}
      topDivider
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text>{propEles.location_name}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text>{propEles.location_town}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>

      <AirbnbRating
        size={10}
        count={5}
        defaultRating={propEles.avg_overall_rating}
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

// CoffeeShopItemComponent.propTypes = {
//   avg_overall_rating: PropTypes.number.isRequired,
//   location_town: PropTypes.string.isRequired,
//   location_name: PropTypes.string.isRequired,
//   location_id: PropTypes.number.isRequired,
//   profile: PropTypes.bool,
// };

export default CoffeeShopItemComponent;
