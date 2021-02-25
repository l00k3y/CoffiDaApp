import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Header, Button } from 'react-native-elements';
import { commonStyles } from '../../styles/common';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      const propEles = this.props;
      const routeParams = propEles.route.params;
      return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${routeParams.locationID}/review/${routeParams.reviewID}/photo`, {
        method: 'post',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': routeParams.userToken,
        },
        body: data,
      })
        .then((response) => {
          if (response.status === 200) {
            ToastAndroid.show('Photo added', ToastAndroid.SHORT);
          } else if (response.status === 400) {
            throw new Error('Bad request');
          } else if (response.status === 401) {
            throw new Error('Unauthorised request');
          } else if (response.status === 404) {
            throw new Error('Review not found');
          } else {
            throw new Error('Server error');
          }
        })
        .catch((error) => {
          ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    } return '';
  }

  render() {
    return (
      <View style={commonStyles.mainView}>
        <Header
          barStyle="default"
          centerComponent={{
            text: 'Take Photo',
            style: { color: 'black', fontWeight: 'bold', fontSize: 20 },
          }}
          containerStyle={{ width: '100%', backgroundColor: '#F6DFD7' }}
          placement="center"
        />
        <View style={commonStyles.mainContentView}>
          <RNCamera
            captureAudio={false}
            ref={(ref) => {
              this.camera = ref;
            }}
            style={{
              flex: 8, justifyContent: 'flex-end', alignItems: 'center', marginTop: '3%',
            }}
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="Update Photo"
              buttonStyle={{ width: '100%', backgroundColor: '#ECD2C7', marginTop: '5%' }}
              titleStyle={{ color: '#36222D', textAlign: 'center' }}
              onPress={this.takePicture.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
