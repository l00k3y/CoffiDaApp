import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import {
  Button, Header, AirbnbRating, Input,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';

export default class AddReviewScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      originalReviewData: {},
      reviewData: {},
      shopData: {},
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        // if find locations reviewed includes location id then send to update screen
        // otherwise add review screen
        // console.log(this.props.route.params.revShopData.location_id);
        this.state.shopData = this.props.route.params.revShopData;
        console.log(this.state.shopData.location_id);
        this.setState({ loginObject: x });
        //   this.checkFavouriteLocation();
        //   this.populatePage();
      });
  }

  handleFinishRating(value, rating) {
    switch (rating) {
      case 'overall':
        this.state.reviewData.overall_rating = value;
        break;
      case 'price':
        this.state.reviewData.price_rating = value;
        break;
      case 'quality':
        this.state.reviewData.quality_rating = value;
        break;
      case 'cleanliness':
        this.state.reviewData.clenliness_rating = value;
        break;
      default:
        break;
    }
  }

  handleBodyInput = (inputBody) => {
    this.state.reviewData.review_body = inputBody;
    console.log(this.state.reviewData.review_body);
  }

  addReview = () => {
    // validate component
    // if.formIsValid() { }
    console.log(`test ${this.state.shopData.locaton_id}`);

    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.shopData.location_id}/review`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
        body: JSON.stringify(this.state.reviewData),
      })
        .then((response) => {
          if (response.status === 201) {
            ToastAndroid.show('Review added', ToastAndroid.SHORT);
            this.props.navigation.goBack();
          } else if (response.status === 400) {
            ToastAndroid.show('Bad request', ToastAndroid.SHORT);
          } else if (response.status === 401) {
            ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
          } else if (response.status === 404) {
            ToastAndroid.show('Location not found', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Server error', ToastAndroid.SHORT);
          } return '';
        });
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    } return '';
  }

  render() {
    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Add Review for ',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          rightComponent={<Icon name="content-save" size={30} type="MaterialCommunityIcons" onPress={() => this.addReview()} />}
        />

        <View style={commonStyles.mainContentView}>

          <View style={{ flex: 1, marginTop: '10%' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={1}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'overall')}
                  showRating={false}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={1}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'price')}
                  showRating={false}
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
                  defaultRating={1}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'quality')}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={1}
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
              value={this.state.reviewData.review_body}
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

            <Button
              title="Add Photo"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => console.log('takePhoto')}
            />
          </View>
        </View>
      </View>
    );
  }
}
