import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { commonStyles } from '../../styles/common';
import { getSessionData } from '../../utils/LoginHelper';
import CoffeeShopItemComponent from '../../components/CoffeeShopItemComponent';

import LoadingScreen from '../LoadingScreen';

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
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      getSessionData()
        .then((x) => {
          this.setState({ loginObject: x });
          if (this.props.route.params.search === true) {
            // search results have been passed so load them
            this.setState({ shopData: this.props.route.params.shopData, isLoading: false });
            this.props.route.params.search === false;
          } else {
            this.getData();
          }
        });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener != null && this.focusListener.remove) {
      this.setState({ shopData: {} });
      this.focusListener.remove();
    }
  }

  getData = async () => {
    const stateEles = this.state;
    try {
      fetch('http://10.0.2.2:3333/api/1.0.0/find', {
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
          } else {
            throw new Error('Server error');
          }
        })
        .then((responseJson) => {
          // populate page
          // set state of relevant data
          this.setState({ isLoading: false, shopData: responseJson });
        });
    } catch (error) {
      console.log(error);
    }
  };

  navigateToSearch() {
    const propEles = this.props;
    const stateEles = this.state;
    propEles.navigation.navigate('SearchShops', { userToken: stateEles.loginObject.token });
  }

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
            text: 'All Coffee Shops',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          leftComponent={<Icon name="clear-all" size={30} type="MaterialIcons" onPress={() => this.getData()} />}
          rightComponent={<Icon name="search" size={30} type="FontAwesome" onPress={() => this.navigateToSearch()} />}
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
            />
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    );
  }
}
