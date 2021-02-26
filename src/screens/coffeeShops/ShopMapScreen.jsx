import React, { Component } from 'react';
import {
  View, Alert, PermissionsAndroid,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { getSessionData } from '../../utils/LoginHelper';
import { commonStyles } from '../../styles/common';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'CoffiDa requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    }
    console.log('Location permission denied');
    return false;
  } catch (err) {
    console.warn(err);
  }
}

export default class ShopMapScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // markers: [{}],
      markers: [{
        title: 'Coffee Shop',
        coordinates: {
          latitude: 53.486,
          longitude: -2.244,
        },
      }],
      location: {},
      // shopData: [],
      hasLocationPermission: false,
      region: {
        latitude: 53.483959,
        longitude: -2.244644,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      },
    };
  }

  componentDidMount() {
    getSessionData()
      .then((x) => {
        this.setState({ loginObject: x });
        this.findCoordinates();
        // this.getData();
        // this.mapMarkers();
      });
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
          this.setState({ shopData: responseJson });
          // let obj = { title: '', coordinates: { latitude: '', longitude: '' } };
          responseJson.map((item) => {
            // build marker object and add to this.state.markers 53.486
            let obj = { title: item.location_name, coordinates: { latitude: item.latitude, longitude: item.longitude }, key: item.location_id };

            // let obj = { title: item.location_name, coordinates: { latitude: 53.486, longitude: -2.224 }, key: item.location_id };
            this.state.markers += obj;
            console.log(obj);
            // console.log(item.latitude);
            // console.log(item.longitude);
          });
          console.log(this.state.markers);
          // console.log(this.state.shopData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  findCoordinates = () => {
    const stateEles = this.state;
    if (!stateEles.locationPermission) {
      console.log('checking for perm');
      this.state.locationPermission = requestLocationPermission();
    }
    Geolocation.getCurrentPosition(
      (position) => {
        // const location = JSON.stringify(position);
        const location = position;
        this.setState({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
        console.log(this.state.location);
        // const markerDetails = {};
        // markerDetails.title = 'My location';
        // markerDetails.description = 'Here I am';
        // markerDetails.key = '1';
        // markerDetails.coordinates.latitude = position.coords.latitude;
        // markerDetails.coordinates.longitude = position.coords.longitude;
        // this.state.markers += markerDetails;
        // console.log(this.state.location);
        // console.log('locationData');
        // console.log(locationData);
        // console.log('state', this.state.location.longitude);
      },
      (error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  // navigateToListShops() {
  //   console.log(this.state.shopData);
  //   this.props.navigation.navigate('ListShops', { search: false, shopData: this.state.shopData });
  // }

  // mapMarkers() {
  //   console.log('test');
  //   const stateEles = this.state;
  //   console.log(stateEles.shopData);
  //   stateEles.shopData.map((shop) => {
  //     console.log(shop);
  //   });
  // }

  render() {
    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Map of Coffee Shops',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
          // leftComponent={<Icon name="format-list-bulleted" size={30} type="FontAwesome" onPress={() => this.navigateToListShops()} />}
        />
        <View style={commonStyles.mainContentView}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={this.state.region}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
              />
            ))}
            {/* <Marker
              coordinate={this.state.markerDetails}
              title="My location"
              description="Here I am"
            /> */}
          </MapView>
        </View>
      </View>
    );
  }
}
