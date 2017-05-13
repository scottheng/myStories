import React, {Component} from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';

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
						width: response.width,
						height: response.height
					},
					hasPhoto: true,
					photo: response.uri,
					faceData: response.data
				});
			}
		});
	}
	render() {
		return (
			<Button
				text="Select photo from Camera Roll"
				onPress={this.selectImage.bind(this)}
				buttonStyles={styles.button}

			/>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		margin: 10,
		padding: 15,
		backgroundColor: '#fff'
	}
});

AppRegistry.registerComponent('ImageAnalyzer', () => ImageAnalyzer);