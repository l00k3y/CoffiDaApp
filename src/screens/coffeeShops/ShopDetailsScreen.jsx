import React from 'react';
import { View, ToastAndroid, Text, Component , StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button, Image, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import { getSessionData } from '../../utils/LoginHelper';
import LoadingScreen from '../LoadingScreen';


import { commonStyles } from "../../styles/common";

export default class ShopDetailsScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shopData: {},
      loginObject: {},
    };
}

  componentDidMount() {
    getSessionData()
    .then((x) => {
      this.setState( { loginObject: x })
      this.populatePage();
    })
  }

  populatePage() {
    // get data from fetch
    // populate form
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
          throw 'Not found';
        } else {
          throw 'Server error';
        }
      })
      .then((responseJson) => {
        // populate page
        // set state of relevant data
        this.setState({ shopData: responseJson })
        console.log(this.state.shopData);
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingScreen />
      );
    } 
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#845D3E' }}>

        <View style={{ flex: 8, flexDirection: 'row', border:'5px solid red', marginTop: '2%' }}> 

          <View style={{ flex: 3, alignItems: 'center', justifyContent:'center' }}> 
            <Text style={commonStyles.titleText}>{this.state.shopData.location_name}</Text>
            <Text>{this.state.shopData.location_town}</Text>
          </View>
          
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center'}}> 
            <Image
            source={{ uri : this.state.shopData.photo_path }}
            style={{ width: 120, height: 120 }}/>
          </View>
        </View>

        <Divider style={{ backgroundColor: 'black' }} />
        

        <View style={{ flex: 4 }}> 
          <Text style={commonStyles.headerStyle}>Ratings</Text>
          <Text>{this.state.shopData.location_town}</Text>
          <Text>{this.state.shopData.location_town}</Text>
          <Text>{this.state.shopData.location_town}</Text>
        </View>
        
        
      </ScrollView>
    );
  }

}
