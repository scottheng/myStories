import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';
import Button from './button';
import lodash from 'lodash';

var ImagePicker = require('react-native-image-picker');


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
		ImagePicker.showImagePicker(this.props.imagePickerOptions, response => {
			if (response.error) {
				alert("Cannot retrieve image");
			}
			else {
				this.setState({
					photo_style: {
						position: 'relative',
						width: 480,
						height: 480
					},
					hasPhoto: true,
					photo: {uri: response.uri},
					photoData: response.data
				});
			}
		});
	}

	renderImage() {

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
		'Ocp-Apim-Subscription-Key': this.props.apiKey
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
		return (
			<View style={styles.container}>
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
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#d6c5ad'
	},
	button: {
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