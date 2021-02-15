import React, { Component } from 'react';
import { View, ToastAndroid, Text, TouchableHighlight } from 'react-native';
import { Button, ListItem, AirbnbRating } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { commonStyles } from '../../styles/common';
import { getSessionData, clearSessionData } from '../../utils/LoginHelper';

import LoadingScreen from '../LoadingScreen'

export default class ListShopScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shopData: {},
      loginObject: {},
    };
  }

  componentDidMount() {
    getSessionData()
    .then((x) => {
      this.setState({ loginObject: x });
      this.getData();
    });
  }

  getData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.loginObject.token,
        },
      });
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        shopData: responseJson,
      })
    } catch (error) {
      console.log(error);
    }
  };

  loadShopDetails(shopID) {
    // console.log('shopID ' + shopID);
    this.props.navigation.navigate('ShopDetails', {shopIdentifier: shopID})
  }


  render() {
    if (this.state.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', padding: '2%' }}>Tap on an item for more info</Text>
        <FlatList
            data={this.state.shopData}
            renderItem={({item}) => {
              return (
                <ListItem
                  bottomDivider
                  Component={TouchableHighlight}
                  containerStyle={{ backgroundColor: '#F6DFD7'}}
                  disabledStyle={{ opacity: 0.5 }}
                  onLongPress={() => console.log("onLongPress()")}
                  onPress={() => this.loadShopDetails(item.location_id)}
                  pad={10}
                  topDivider
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text>{item.location_name}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text>{item.location_town}</Text>
                    </ListItem.Subtitle>
                  </ListItem.Content>

                  <AirbnbRating
                      size={10}
                      style={{ fontSize: '10px' }}
                      count={5}
                      defaultRating={item.avg_overall_rating}
                      reviews={[
                        "Terrible",
                        "Bad",
                        "Okay",
                        "Good",
                        "Great"
                      ]}
                      showRating
                      isDisabled
                    />
                </ListItem>
                // <View>
                //   <Text></Text>
                //   <Button
                //     title=""
                //     onPress={() => this.deleteItem(item.id)}
                //   />
                //   <Button
                //     title="Update"
                //     onPress={() => this.getItem(item.id)}
                //   />
                // </View>
              );
            }}
            keyExtractor={({id}) => id}
          />
      </View>  
    );
  }

}