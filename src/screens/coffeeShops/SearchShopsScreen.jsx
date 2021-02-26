import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import {
  Header, AirbnbRating, SearchBar, Button,
} from 'react-native-elements';
import ValidationComponent from 'react-native-form-validator';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { commonStyles } from '../../styles/common';

// import LoadingScreen from '../LoadingScreen';

export default class SearchShopsScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      overallRating: '',
      priceRating: '',
      qualityRating: '',
      cleanlinessRating: '',
      searchQuery: '',
      searchIn: '',
      locationData: {},
      loginObject: {},
    };
  }

  handleSearchQuery = (query) => {
    this.setState({ searchQuery: query });
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

  buildSearchURL = () => {
    let queryCount = 0;
    let searchURL = '?';
    const stateEles = this.state;
    if (stateEles.searchQuery !== '') {
      searchURL += `q=${stateEles.searchQuery}`;
      queryCount += 1;
    }
    if (stateEles.overallRating !== '') {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `overall_rating=${stateEles.overallRating}`;
      queryCount += 1;
    }
    if (stateEles.priceRating !== '') {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `price_rating=${stateEles.priceRating}`;
      queryCount += 1;
    }
    if (stateEles.qualityRating !== '') {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `quality_rating=${stateEles.qualityRating}`;
      queryCount += 1;
    }
    if (stateEles.cleanlinessRating !== '') {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `clenliness_rating=${stateEles.cleanlinessRating}`;
      queryCount += 1;
    }
    if (stateEles.searchIn !== '') {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `search_in=${stateEles.searchIn}`;
      queryCount += 1;
    }
    if (queryCount === 0) { searchURL = ''; }
    return searchURL;
  }

  searchShops = async () => {
    const searchURL = this.buildSearchURL();
    console.log(searchURL);
    const stateEles = this.state;
    const routeProps = this.props;
    try {
      fetch(`http://10.0.2.2:3333/api/1.0.0/find${searchURL}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': routeProps.route.params.userToken,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } if (response.status === 400) {
            ToastAndroid.show('Bad request', ToastAndroid.SHORT);
          } else if (response.status === 401) {
            ToastAndroid.show('Unauthorised request', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Server error', ToastAndroid.SHORT);
          }
        })
        .then((responseJson) => {
          if (!responseJson) {
            // no results found
            ToastAndroid.show('No results found', ToastAndroid.SHORT);
            return '';
          }
          // navigate to list shops screen with responeJson as route prop
          routeProps.navigation.navigate('ListShops', { shopData: responseJson, search: true });
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleSearchIn = (changeItem) => {
    this.setState({ searchIn: changeItem.value });
  }

  render() {
    const stateEles = this.state;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#845D3E' }} contentContainerStyle={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Search for Coffee Shops',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
        />

        <View style={commonStyles.mainContentView}>
          <View style={{ flex: 3, marginTop: '4%' }}>
            <SearchBar
              containerStyle={{ backgroundColor: '#845D3E', borderColor: '#845D3E', color: 'black' }}
              inputContainerStyle={{ backgroundColor: '#BF9B79', color: 'black' }}
              color="black"
              placeholder="Enter coffee shop name"
              placeholderTextColor="black"
              onChangeText={this.handleSearchQuery}
              value={stateEles.searchQuery}
            />
          </View>
          <View style={{ flex: 5, marginTop: '4%' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'overall')}
                  showRating={false}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
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
                  defaultRating={0}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'quality')}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={20}
                  onFinishRating={(v) => this.handleFinishRating(v, 'cleanliness')}
                  showRating={false}
                />
              </View>
            </View>
          </View>

          <View style={{
            flex: 1, paddingVertical: 75, justifyContent: 'space-evenly', alignItems: 'center',
          }}
          >
            <Text style={{ height: '50%' }}>Search in reviewed or favourite locations</Text>
            <DropDownPicker
              items={[
                {
                  label: 'Reviewed', value: 'reviewed', icon: () => <Icon name="lead-pencil" type="MaterialCommunityIcons" size={18} color="#BF9B79" />,
                },
                { label: 'Favourite', value: 'favourite', icon: () => <Icon name="heart" type="MaterialCommunityIcons" size={18} color="#BF9B79" /> },
              ]}
              containerStyle={{ width: '95%', height: '50%' }}
              style={{ backgroundColor: '#BF9B79' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => this.handleSearchIn(item)}
            />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="Begin Search"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={() => this.searchShops()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
