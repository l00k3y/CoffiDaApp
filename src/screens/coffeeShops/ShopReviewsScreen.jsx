import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import LoadingScreen from '../LoadingScreen';
import { commonStyles } from '../../styles/common';
import ReviewItemComponent from '../../components/ReviewComponent';

export default class ShopReviewsScreen extends ValidationComponent {
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
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.props.route.params.shopIdentifier}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } if (response.status === 404) {
            throw new Error('Not found');
          } else {
            throw new Error('Server error');
          }
        })
        .then((responseJson) => {
        // populate page
        // set state of relevant data
          this.setState({ shopData: responseJson, isLoading: false });
        });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  navigateToAddReview() {
    if (this.props.route.params.profile) {
      console.log('add review profile');
      this.props.navigation.navigate('ProfileAddReview', { revShopData: this.state.shopData, profile: true });
    } else {
      this.props.navigation.navigate('AddReview', { revShopData: this.state.shopData });
    }
  }

  returnCorrectReviewItem(currentItem) {
    if (this.props.route.params.profile) {
      return (
        <ReviewItemComponent
          review_data={currentItem}
          shopID={this.props.route.params.shopIdentifier}
          profile
        />
      );
    }
    return (
      <ReviewItemComponent
        review_data={currentItem}
        shopID={this.props.route.params.shopIdentifier}
      />
    );
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: `${this.state.shopData.location_name} Reviews`,
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          rightComponent={<Icon name="plus-box" size={30} type="MaterialCommunityIcons" onPress={() => this.navigateToAddReview()} />}
        />

        <View style={commonStyles.mainContentView}>

          <Text style={{ textAlign: 'center', paddingVertical: 10 }}>Tap a review for photos and more information</Text>
          <FlatList
            data={this.state.shopData.location_reviews}
            renderItem={({ item }) => (this.returnCorrectReviewItem(item))}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      </View>
    );
  }
}
