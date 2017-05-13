import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImagePickerIOS,
  CameraRoll,
  Image
} from 'react-native';

export default class myStories extends Component {
  constructor() {
    super();
    this.state = { image: null };
  }

  componentDidMount() {
    this.pickImage();
    this.getMetaData();
  }

  pickImage() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
      console.log(imageUri);
    }, error => console.log(error));
  }

  getMetaData() {
    CameraRoll.getPhotos({first: 6}, response => {
      console.log(response);
    }, error => console.log(error));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.image ?
          <Image style={{flex: 1 }} source={{ uri: this.state.image }} /> : null 
        }
      </View>
    );
  }
}


AppRegistry.registerComponent('myStories', () => myStories);
