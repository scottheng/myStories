import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import RNFetchBlob from 'react-native-fetch-blob';
import Button from './button';
import lodash from 'lodash';

var ImagePicker = require('react-native-image-picker');

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

export default class ImageAnalyzer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photoStyle: {
				position: 'relative',
				width: 480,
				height: 480
			},
			hasPhoto: false,
			photo: null,
			faceData: null
		};
	}
	
	selectImage() {
		this.setState({faceData: null});
		ImagePicker.showImagePicker(imagePickerOptions, response => {
			if (response.error) {
				alert("Cannot retrieve image");
			}
			else {
				this.setState({
					photo_style: {
						position: 'relative',
						width: 360,
						height: 360,
						alignSelf: 'center'
					},
					hasPhoto: true,
					photo: {uri: response.uri},
					photoData: response.data
				});
			}
		});
	}

	renderCreateStoryButton() {
		if (this.state.hasPhoto) {
			return (
				<Button
					text="Create Story"
					onPress={this.fetchFaceData.bind(this)}
					buttonStyles={styles.button}
					buttonTextStyles={styles.text}
				/>
			);
		}
	}

	fetchFaceData() {
		RNFetchBlob.fetch('POST', 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,emotion', {
		'Accept': 'application/json',
  	 	'Content-Type': 'application/octet-stream',
		'Ocp-Apim-Subscription-Key': apiKey
		}, this.state.photoData)
		.then(res => {
			return res.json();
		})
		.then(json => {
			if (json.length) {
				this.setState({faceData: json});
				console.log(json);
			}
			else {
				alert("There are no faces in this picture");
			}
			return json;
		})
		.catch( function(error) {
			alert('Sorry, the request failed. Please try again.' + JSON.stringify(error));
		});
	}
	
	render() {
		const leftButtonConfig = {
			title: 'Back',
			handler: () => this.props.navigator.pop(),
		};
		return (
			<View style={styles.container}>
				<NavigationBar title={{ title: 'myStories', }} leftButton={leftButtonConfig} />
				<Image
					style={this.state.photo_style}
					source={this.state.photo}
				></Image>
				<Button
					text="Select photo from Camera Roll"
					onPress={this.selectImage.bind(this)}
					buttonStyles={styles.button}
					buttonTextStyles={styles.text}
				/>
				{this.renderCreateStoryButton.call(this)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// alignSelf: 'center',
		backgroundColor: '#d6c5ad'
	},
	button: {
		alignSelf: 'center',
		margin: 20,
		padding: 15,
		backgroundColor: '#6bd3e0',
	},
	text: {
		color: '#fff',
		fontSize: 18
	}
});

AppRegistry.registerComponent('ImageAnalyzer', () => ImageAnalyzer);