import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { Header, AirbnbRating, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { ScrollView } from 'react-native-gesture-handler';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';
import textIsProfane from '../../utils/Strings';

export default class AddReviewScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reviewData: {},
      overallRating: 1,
      priceRating: 1,
      qualityRating: 1,
      cleanlinessRating: 1,
      reviewBody: '',
      shopData: {},
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        this.state.shopData = this.props.route.params.revShopData;
        this.setState({ loginObject: x });
      });
  }

  onSubmit() {
    this.validate({
      overallRating: { required: true },
      priceRating: { required: true },
      qualityRating: { required: true },
      cleanlinessRating: { required: true },
      reviewBody: { required: true },
    });
    if (this.isFormValid()) {
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

  handleBodyInput = (inputBody) => {
    this.setState({ reviewBody: inputBody });
  }

  buildReviewDetails() {
    const toSend = {};
    const stateEles = this.state;
    toSend.overall_rating = stateEles.overallRating;
    toSend.price_rating = stateEles.priceRating;
    toSend.quality_rating = stateEles.qualityRating;
    toSend.clenliness_rating = stateEles.cleanlinessRating;
    toSend.review_body = stateEles.reviewBody;
    return toSend;
  }

  addReview = () => {
    if (this.onSubmit()) {
      try {
        return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.shopData.location_id}/review`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.loginObject.token,
          },
          body: JSON.stringify(this.buildReviewDetails()),
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
      }
    } return '';
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Add Review',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          rightComponent={<Icon name="content-save" size={30} type="MaterialCommunityIcons" onPress={() => this.addReview()} />}
        />

        <View style={commonStyles.mainContentView}>

          <View style={{ flex: 1, marginTop: '4%' }}>
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
              value={this.state.reviewBody}
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

            <Text>
              To add a photo to your review,
              save your review and add the photo from My Reviews in Profile
            </Text>

            {/* <Button
              title="Add Photo"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => console.log('takePhoto')}
            /> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}
