import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { commonStyles } from '../../styles/common';
import { getSessionData } from '../../utils/LoginHelper';
import CoffeeShopItemComponent from '../../components/CoffeeShopItemComponent';

import LoadingScreen from '../LoadingScreen';

export default class FavouriteLocationsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shopData: {},
      loginObject: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      getSessionData()
        .then((x) => {
          this.setState({ loginObject: x });
          this.getData();
        });
    });
  }

  componentWillUnmount() {
  // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  getData = async () => {
    const stateEles = this.state;
    try {
      const response = await fetch('http://10.0.2.2:3333/api/1.0.0/find?search_in=favourite', {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': stateEles.loginObject.token,
        },
      });
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        shopData: responseJson,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const stateEles = this.state;
    if (stateEles.isLoading === true) {
      return (
        <LoadingScreen />
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'My Favourite Locations',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
        />
        <Text style={{ textAlign: 'center', padding: '2%' }}>Tap an item for more info</Text>
        <FlatList
          style={commonStyles.contentStyle}
          data={stateEles.shopData}
          renderItem={({ item }) => (
            <CoffeeShopItemComponent
              location_id={item.location_id}
              location_name={item.location_name}
              location_town={item.location_town}
              avg_overall_rating={item.avg_overall_rating}
              profile
            />
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    );
  }
}
