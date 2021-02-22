import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  ListItem, AirbnbRating, Header,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import LoadingScreen from '../LoadingScreen';
import { commonStyles } from '../../styles/common';

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
    this.props.navigation.navigate('AddReview', { revShopData: this.state.shopData });
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
            renderItem={({ item }) => (
              <ListItem
                bottomDivider
                Component={TouchableHighlight}
                containerStyle={{ backgroundColor: '#F6DFD7' }}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => console.log('test')}
                pad={10}
                topDivider
              >
                <ListItem.Content>
                  <ListItem.Title>
                    <Text>{item.review_body}</Text>
                  </ListItem.Title>
                </ListItem.Content>

                <AirbnbRating
                  size={10}
                  count={5}
                  defaultRating={item.overall_rating}
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
                {/* <CheckBox
                  center
                  checked={this.state.favourited}
                  checkedColor="#F00"
                  checkedIcon="heart"
                  checkedTitle=""
                  containerStyle={{ marginLeft: '5%', width:'90%', b
                  ackgroundColor: '#ECD2C7', marginTop: '5%', border: 'none'}}
                  iconLeft
                  onPress={() => console.log('test')}
                  size={20}
                  textStyle={{ color: '#36222D', fontSize: 16 }}
                  title=""
                  uncheckedColor="#F00"
                  uncheckedIcon="heart-o"
                /> */}

              </ListItem>
            )}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      </View>
    );
  }
}
