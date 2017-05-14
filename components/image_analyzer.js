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
						width: 480,
						height: 480
					},
					hasPhoto: true,
					photo: {uri: response.uri},
					faceData: response.data
				});
			}
		});
	}

	renderImage() {

	}
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={this.state.photo_style}
					source={this.state.photo}
				>{this.renderImage.call(this)}</Image>
				<Button
					text="Select photo from Camera Roll"
					onPress={this.selectImage.bind(this)}
					buttonStyles={styles.button}
					buttonTextStyles={styles.text}
				/>
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
		margin: 40,
		padding: 15,
		backgroundColor: '#6bd3e0',
	},
	text: {
		color: '#fff',
		fontSize: 18
	}
});

AppRegistry.registerComponent('ImageAnalyzer', () => ImageAnalyzer);