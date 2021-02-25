import React from 'react';
import { View, Text } from 'react-native';
import {
  Header, AirbnbRating, SearchBar,
} from 'react-native-elements';
import ValidationComponent from 'react-native-form-validator';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles } from '../../styles/common';

// import LoadingScreen from '../LoadingScreen';

export default class SearchShopsScreen extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      overallRating: null,
      priceRating: null,
      qualityRating: null,
      cleanlinessRating: null,
      searchQuery: null,
      searchIn: null,
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
    if (stateEles.searchQuery !== null) {
      searchURL += `q=${stateEles.searchQuery}`;
      queryCount += 1;
    }
    if (stateEles.overallRating !== null) {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `overall_rating=${stateEles.overallRating}`;
      queryCount += 1;
    }
    if (stateEles.priceRating !== null) {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `price_rating=${stateEles.priceRating}`;
      queryCount += 1;
    }
    if (stateEles.qualityRating !== null) {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `quality_rating=${stateEles.qualityRating}`;
      queryCount += 1;
    }
    if (stateEles.cleanlinessRating !== null) {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `clenliness_rating=${stateEles.cleanlinessRating}`;
      queryCount += 1;
    }
    if (stateEles.searchIn !== null) {
      if (queryCount > 0) {
        searchURL += '&';
      }
      searchURL += `search_in=${stateEles.searchIn}`;
      queryCount += 1;
    }
    return searchURL;
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
          <SearchBar
            containerStyle={{ backgroundColor: '#845D3E', borderColor: '#845D3E', color: 'black' }}
            inputContainerStyle={{ backgroundColor: '#BF9B79', color: 'black' }}
            placeholder="Enter coffee shop name"
            onChangeText={this.handleSearchQuery}
            value={stateEles.searchQuery}
          />

          <View style={{ flex: 1, marginTop: '4%' }}>
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

          <View style={{ flex: 1 }}>
            <DropDownPicker
              items={[
                { label: 'Search in', value: 'Favourite' },
                // , icon: () => <Icon name="flag" size={18} color="#900" /> },
                { label: 'Search in', value: 'Reviewed' },
              ]}
              containerStyle={{ width: '100%' }}
              style={{ backgroundColor: '#BF9B79' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={(item) => this.setState({
                searchIn: item.value,
              })}
            />
          </View>

          {/* 4 ratings, search in drop down */}
        </View>
      </ScrollView>
    );
  }
}
