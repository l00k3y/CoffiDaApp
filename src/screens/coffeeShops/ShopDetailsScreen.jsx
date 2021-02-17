import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Image, Divider, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import LoadingScreen from '../LoadingScreen';
import { commonStyles } from "../../styles/common";

export default class ShopDetailsScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shopData: {},
      loginObject: {},
      favourited: false,
      favouriteLocations: {},
    };
}

  componentDidMount() {
    getSessionData()
    .then((x) => {
      this.setState( { loginObject: x })
      this.checkFavouriteLocation();
      this.populatePage();
    });
  }

  populatePage() {
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.props.route.params.shopIdentifier}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
      })
      .then((response) => {
        if(response.status === 200) {
          return response.json();
        } if(response.status === 404) {
          throw new Error('Not found');
        } else {
          throw new Error('Server error');
        }
      })
      .then((responseJson) => {
        // populate page
        // set state of relevant data
        this.setState({ shopData: responseJson })
      });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  checkFavouriteLocation() {
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/user/${this.state.loginObject.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          throw new Error ('Bad request');
        } else if (response.status === 401) {
          throw new Error('Unauthorised request');
        } else if (response.status === 404) {
          throw new Error('Not found');
        } else {
          throw new Error('Server error');
        }
      })
      .then((responseJson) => {
        const found = responseJson.favourite_locations.some(v => (v.location_id === this.props.route.params.shopIdentifier))
        this.setState({ favourited: found, isLoading: false })
      });
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  favouriteLocation() {
    // check user object if location id is in favourite_locations, set this.state.checked based on result
    let httpMethod = 'post';
    if (this.state.favourited === true) {
      httpMethod = 'delete';
    }
    try {
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.props.route.params.shopIdentifier}/favourite`, {
        method : httpMethod,
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ favourited: !this.state.favourited })
        } else if (response.status === 400) {
          throw new Error ('Bad request');
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

  navigateToShopReviews() {
    this.props.navigation.navigate('ShopReviews', {shopData: this.state.shopData} )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen />
      );
    } 
    return (
      <View style={{ flex: 1, backgroundColor: '#845D3E' }}>

        <View style={{ flex: 2, flexDirection: 'row', marginTop: '15%' }}> 
          
          <View style={{ flex: 3, alignItems: 'center', justifyContent:'center' }}> 
            <Text style={commonStyles.titleText}>{this.state.shopData.location_name}</Text>
            <Text>{this.state.shopData.location_town}</Text>
          </View>
          
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center'}}> 
            <Image
            source={{ uri : this.state.shopData.photo_path }}
            style={{ width: 120, height: 120, }}/>
          </View>
        </View>

        <Divider style={{ backgroundColor: 'black' }} />
        

        <View style={{ flex: 3, justifyContent:'center' }}> 
          <Text style={commonStyles.headerStyle}>Ratings</Text>
          <View style={commonStyles.ratingItemStyle}>
            <Text>Average Overall Rating: {this.state.shopData.avg_overall_rating}</Text>
            <Icon name="star" size={20} type="MaterialCommunityIcons" />
          </View>

          <View style={commonStyles.ratingItemStyle}>
            <Text>Average Price Rating: {this.state.shopData.avg_price_rating}</Text>
            <Icon name="star" size={20} type="MaterialCommunityIcons" />
          </View>

          <View style={commonStyles.ratingItemStyle}>
            <Text>Average Quality Rating: {this.state.shopData.avg_quality_rating}</Text>
            <Icon name="star" size={20} type="MaterialCommunityIcons" />
          </View>

          <View style={commonStyles.ratingItemStyle}>
            <Text>Average Cleanliness Rating: {this.state.shopData.avg_clenliness_rating}</Text>
            <Icon name="star" size={20} type="MaterialCommunityIcons" />
          </View>
        </View>

        <Divider style={{ backgroundColor: 'black', marginTop: '5%' }} />

        <View style={{flex: 3, flexDirection: 'column', justifyContent: 'center'}}>
          <CheckBox
            center
            checked={this.state.favourited}
            checkedColor="#F00"
            checkedIcon="heart"
            checkedTitle="Favourited"
            containerStyle={{ marginLeft: '5%', width:'90%', backgroundColor: '#ECD2C7', marginTop: '5%', border: 'none'}}
            iconLeft
            onPress={() => this.favouriteLocation()}
            size={20}
            textStyle={{ color: '#36222D', fontSize: 16 }}
            title="Favourite this location"
            uncheckedColor="#F00"
            uncheckedIcon="heart-o"
          />
          <Button title="View Reviews" buttonStyle={{
              width: '90%', backgroundColor: '#ECD2C7', marginTop:'5%', marginLeft: '5%'
            }}
            titleStyle={{ color: '#36222D', textAlign: 'center' }} onPress={() => this.navigateToShopReviews()}
        />
        </View>
      </View>
    );
  }

}
