import React from 'react';
import {
  View, Text, ToastAndroid, Alert,
} from 'react-native';
import {
  Header, AirbnbRating, Image, Button, Input,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { ScrollView } from 'react-native-gesture-handler';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';

import textIsProfane from '../../utils/Strings';
// import LoadingScreen from '../LoadingScreen';

export default class UpdateMyReviewScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      originalReviewData: {},
      // reviewData: {},
      overallRating: 1,
      priceRating: 1,
      qualityRating: 1,
      cleanlinessRating: 1,
      reviewBody: '',
      locationData: {},
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        // console.log(this.props.route.params.shopIdentifier);
        this.setState({
          loginObject: x,
          originalReviewData: this.props.route.params.reviewData,
          reviewBody: this.props.route.params.reviewData.review_body,
          locationData: this.props.route.params.locationData,
        });
        // check for photo
      });
  }

  onSubmit() {
    this.validate({
      overall_rating: 1,
      price_rating: 1,
      quality_rating: 1,
      clenliness_rating: 1,
      reviewBody: { required: true },
    });
    if (this.isFormValid()) {
      // check for bad words
      const profaneFilter = textIsProfane(this.state.reviewBody);
      if (profaneFilter) {
        ToastAndroid.show('Please keep the review strictly about coffee', ToastAndroid.SHORT);
        return false;
      }
      return true;
    }
    ToastAndroid.show(this.getErrorMessages('\n'), ToastAndroid.SHORT);
    return false;
  }

  handleFinishRating(value, rating) {
    switch (rating) {
      case 'overall':
        this.state.overallRating = value;
        break;
      case 'price':
        this.state.priceRating = value;
        break;
      case 'quality':
        this.state.qualityRating = value;
        break;
      case 'cleanliness':
        this.state.cleanlinessRating = value;
        break;
      default:
        break;
    }
  }

  deleteReview = () => {
    const stateEles = this.state;
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${stateEles.locationData.location_id}/review/${stateEles.originalReviewData.review_id}`, {
        method: 'delete',
        headers: {
          'X-Authorization': this.state.loginObject.token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show('Review deleted', ToastAndroid.SHORT);
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            ToastAndroid.show('Bad request', ToastAndroid.SHORT);
          } else if (response.status === 401) {
            ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
          } else if (response.status === 403) {
            ToastAndroid.show('Forbidden request', ToastAndroid.SHORT);
          } else if (response.status === 404) {
            ToastAndroid.show('Not found', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Server error', ToastAndroid.SHORT);
          } return '';
        });
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
    // delete photo
    // delete review
  }

  updateReview = () => {
    const stateEles = this.state;
    if (this.onSubmit()) {
      try {
        return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${stateEles.locationData.location_id}/review/${stateEles.originalReviewData.review_id}`, {
          method: 'patch',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.loginObject.token,
          },
          body: JSON.stringify(this.buildReviewDetails()),
        })
          .then((response) => {
            if (response.status === 200) {
              ToastAndroid.show('Review updated', ToastAndroid.SHORT);
            } else if (response.status === 400) {
              ToastAndroid.show('Bad request', ToastAndroid.SHORT);
            } else if (response.status === 401) {
              ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
            } else if (response.status === 403) {
              ToastAndroid.show('Forbidden request', ToastAndroid.SHORT);
            } else if (response.status === 404) {
              ToastAndroid.show('Location not found', ToastAndroid.SHORT);
            } else {
              ToastAndroid.show('Server error', ToastAndroid.SHORT);
            } return '';
          });
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    } return '';
  }

  buildReviewDetails() {
    const toSend = {};
    const stateEles = this.state;
    if (stateEles.overallRating !== stateEles.originalReviewData.overall_rating) {
      toSend.overall_rating = stateEles.overallRating;
    }
    if (stateEles.priceRating !== stateEles.originalReviewData.price_rating) {
      toSend.price_rating = stateEles.priceRating;
    }
    if (stateEles.qualityRating !== stateEles.originalReviewData.quality_rating) {
      toSend.quality_rating = stateEles.qualityRating;
    }
    if (stateEles.cleanlinessRating !== stateEles.originalReviewData.clenliness_rating) {
      toSend.clenliness_rating = stateEles.cleanlinessRating;
    }
    if (stateEles.reviewBody !== stateEles.originalReviewData.review_body) {
      toSend.review_body = stateEles.reviewBody;
      // check if string contains profanity
    }
    return toSend;
  }

  deletePhoto = () => {
    // delete photo

  }

  handleBodyInput = (inputBody) => {
    this.setState({ reviewBody: inputBody });
  }

  render() {
    const stateEles = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Header
          barStyle="default"
          centerComponent={{
            text: `Update ${this.state.locationData.location_name} Review`,
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          rightComponent={<Icon name="content-save" size={30} type="MaterialCommunityIcons" onPress={() => this.updateReview()} />}
        />

        <View style={commonStyles.mainContentView}>

          <View style={{ flex: 1, marginTop: '4%' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.originalReviewData.overall_rating}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'overall')}
                  showRating={false}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.originalReviewData.price_rating}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'price')}
                  showRating={false}
                />
              </View>
            </View>

            <View style={{
              flex: 1, flexDirection: 'row', alignItems: 'baseline', marginTop: '5%',
            }}
            >
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Quality</Text>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  style={{ size: 1 }}
                  defaultRating={stateEles.originalReviewData.quality_rating}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'quality')}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={stateEles.originalReviewData.clenliness_rating}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'cleanliness')}
                  showRating={false}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 3 }}>
            <Input
              placeholderTextColor="#36222D"
              value={stateEles.reviewBody}
              onChangeText={this.handleBodyInput}
              containerStyle={{ marginTop: '10%' }}
              disabledInputStyle={{ background: '#ddd' }}
              inputContainerStyle={{ borderColor: '#ECD2C7' }}
              inputStyle={{ color: '#36222D' }}
              label="Review Body"
              labelStyle={{ color: '#36222D' }}
              leftIcon={<Icon name="pencil" size={20} />}
              placeholder="Great coffee"
            />

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG' }}
                style={{ width: 120, height: 120 }}
              />
            </View>

            <Button
              title="Update Photo"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => console.log('updatePhoto')}
            />

            <Button
              title="Delete Photo"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => console.log('deletePhoto')}
            />

            <Button
              title="Delete Review"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => Alert.alert(
                'Delete Review',
                'Are you sure you want to delete your review?',
                [
                  {
                    text: 'Yes',
                    onPress: () => this.deleteReview(),
                  },
                  {
                    text: 'No',
                    // onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                { cancelable: false },
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
