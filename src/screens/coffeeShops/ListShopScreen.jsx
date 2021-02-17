import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { ListItem, AirbnbRating, Header, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { commonStyles } from '../../styles/common';
import { getSessionData } from '../../utils/LoginHelper';

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

    // check if route.params. contains searchResults, if so set shopData to searchResults route param
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
        <Header
            barStyle="default"
            centerComponent={{
              text: `All Coffee Shops`,
              style: { color: "black", fontWeight: 'bold', fontSize: 20 }
            }}
            containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
            placement="center"
            rightComponent={<Icon name="search" size={30} type="FontAwesome" onPress={() => console.log("addReview")} /> }
          />

        <Text style={{ textAlign: 'center', padding: '2%' }}>Tap an item for more info</Text>
        <FlatList
            style={commonStyles.contentStyle}
            data={this.state.shopData}
            renderItem={({item}) => 
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
            }
            keyExtractor={(item) => item.location_id.toString()}
          />
      </View>  
    );
  }

}