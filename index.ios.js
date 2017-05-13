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
import ImageAnalyzer from './components/image_analyzer';

const imagePickerOptions = {
  title: 'Select Photo', 
  takePhotoButtonTitle: null, 
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  maxWidth: 480,
  quality: 1, 
  noData: false, 
  path: 'images'
};

const apiKey = 'adfefc3c4b3a4f9995699379667e719f';

export default class myStories extends Component {

  render() {
    return (
      <View>
        <ImageAnalyzer imagePickerOptions={imagePickerOptions} />
      </View>
    );
  }
  
}


AppRegistry.registerComponent('myStories', () => myStories);
