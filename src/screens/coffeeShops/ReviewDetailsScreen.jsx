import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  Header, AirbnbRating, Image, CheckBox,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';
import LoadingScreen from '../LoadingScreen';

export default class ReviewDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviewData: {},
      liked: false,
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        // console.log(this.props.route.params.shopIdentifier);
        this.setState({ loginObject: x, reviewData: this.props.route.params.reviewData });
        this.checkLikedReview();
        // check for photo
      });
  }

  // validate component
  // // if.formIsValid() { }
  // console.log(`test ${this.state.shopData.locaton_id}`);

  // try {
  //   return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.shopData.location_id}/review`, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Authorization': this.state.loginObject.token,
  //     },
  //     body: JSON.stringify(this.state.reviewData),
  //   })
  //     .then((response) => {
  //       if (response.status === 201) {
  //         ToastAndroid.show('Review added', ToastAndroid.SHORT);
  //         this.props.navigation.goBack();
  //       } else if (response.status === 400) {
  //         ToastAndroid.show('Bad request', ToastAndroid.SHORT);
  //       } else if (response.status === 401) {
  //         ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
  //       } else if (response.status === 404) {
  //         ToastAndroid.show('Location not found', ToastAndroid.SHORT);
  //       } else {
  //         ToastAndroid.show('Server error', ToastAndroid.SHORT);
  //       } return '';
  //     });
  // } catch (error) {
  //   ToastAndroid.show(error, ToastAndroid.SHORT);
  // } return '';

  checkLikedReview = () => {
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
          } if (response.status === 400) {
            throw new Error('Bad request');
          } else if (response.status === 401) {
            throw new Error('Unauthorised request');
          } else if (response.status === 404) {
            throw new Error('Not found');
          } else {
            throw new Error('Server error');
          }
        })
        .then((responseJson) => {
          const found = responseJson.liked_reviews.some(
            (v) => (v.review.review_id === stateEles.reviewData.review_id),
          );
          this.setState({ liked: found, isLoading: false });
        });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  likeReview = () => {
    const stateEles = this.state;
    const propEles = this.props;
    let httpMethod = 'post';
    let addOrTake = 1;
    if (stateEles.liked === true) {
      httpMethod = 'delete';
      addOrTake = -1;
    }
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${propEles.route.params.shopIdentifier}/review/${stateEles.reviewData.review_id}/like`, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': stateEles.loginObject.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            stateEles.reviewData.likes += addOrTake;
            this.setState({ liked: !stateEles.liked });
          } else if (response.status === 400) {
            throw new Error('Bad request');
          } else if (response.status === 401) {
            throw new Error('Unauthorised request');
          } else if (response.status === 404) {
            throw new Error('Not found');
          } else {
            throw new Error('Server error');
          }
        });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  render() {
    const stateEles = this.state;
    if (stateEles.isLoading) {
      return (
        <LoadingScreen />
      );
    }

    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Review Information',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          rightComponent={<Icon name="refresh" size={30} type="MaterialCommunityIcons" onPress={() => this.componentDidMount()} />}
        />

        <View style={commonStyles.mainContentView}>

          <View style={{ flex: 1, marginTop: '10%' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.reviewData.overall_rating}
                  size={20}
                  showRating={false}
                  isDisabled
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.reviewData.price_rating}
                  size={20}
                  showRating={false}
                  isDisabled
                />
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Quality</Text>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  style={{ size: 1 }}
                  defaultRating={stateEles.reviewData.quality_rating}
                  size={20}
                  isDisabled
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.reviewData.clenliness_rating}
                  size={20}
                  isDisabled
                  showRating={false}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', paddingVertical: 20 }}>{stateEles.reviewData.review_body}</Text>
            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>
              {stateEles.reviewData.likes}
              {' '}
              like(s)
            </Text>

            <CheckBox
              center
              checked={stateEles.liked}
              checkedColor="#F00"
              checkedIcon="heart"
              checkedTitle="Review liked"
              containerStyle={{
                marginLeft: '5%', width: '90%', backgroundColor: '#ECD2C7', marginTop: '5%', border: 'none',
              }}
              iconLeft
              onPress={() => this.likeReview()}
              size={20}
              textStyle={{ color: '#36222D', fontSize: 16 }}
              title="Like this review"
              uncheckedColor="#F00"
              uncheckedIcon="heart-o"
            />

            {/* if photo then show in image */}
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG' }}
                style={{ width: 120, height: 120 }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
