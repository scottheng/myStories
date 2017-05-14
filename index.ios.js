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
import NavigationExperimental from 'react-native-deprecated-custom-components';
import NavigationBar from 'react-native-navbar';
import ImageAnalyzer from './components/image_analyzer';
import Welcome from './components/welcome';

function renderScene(route, navigator) {
  return <route.component route={route} navigator={navigator} />;
}

export default class myStories extends Component {

  render() {
    const initialRoute = {
      component: Welcome
    };

    return (
      <View style={styles.container} >
        <NavigationExperimental.Navigator initialRoute={initialRoute} renderScene={renderScene} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#d6c5ad',
  }
});


AppRegistry.registerComponent('myStories', () => myStories);
