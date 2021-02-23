import React, { Component } from 'react';
import {
  View, FlatList, Text,
} from 'react-native';
import {
  Header, Icon,
} from 'react-native-elements';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';
import ReviewItemComponent from '../../components/ReviewComponent';

import LoadingScreen from '../LoadingScreen';

export default class MyReviewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shopData: {},
      reviews: {},
      loginObject: {},
      favourited: false,
      favouriteLocations: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      getSessionData()
        .then((x) => {
          this.setState({ loginObject: x });
          this.populatePage();
        });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  populatePage() {
  // get reviews for location ID to fix no update bug
  // this.setState({ shopData: this.props.route.params.shopIdentifier, isLoading: false });
    const stateEles = this.state;
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/user/${stateEles.loginObject.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': stateEles.loginObject.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } if (response.status === 401) {
            throw new Error('Unauthorised Request');
          } else if (response.status === 401) {
            throw new Error('Not found');
          } else {
            throw new Error('Server error');
          }
        })
        .then((responseJson) => {
          this.setState({ reviews: responseJson.reviews, isLoading: false });
          console.log(stateEles.reviews);
        });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  render() {
    const stateEles = this.state;
    if (stateEles.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'My Reviews',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          // rightComponent={<Icon name="plus-box" size={30}
          // type="MaterialCommunityIcons" onPress={() => this.navigateToAddReview()} />}
        />

        <View style={commonStyles.mainContentView}>

          <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Tap a review to update or delete it</Text>
          <FlatList
          // this.state.shopData.location_reviews
            data={stateEles.reviews}
            renderItem={({ item }) => (
              <ReviewItemComponent review_data={item} shopID={item.location.location_id} update />)}
              // <ReviewItemComponent review_data={item.props} review_body={item.review.review_body}  />)}
            keyExtractor={(item) => item.review.review_id.toString()}
          />
        </View>
      </View>
    );
  }
}
