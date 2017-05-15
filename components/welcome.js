import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ImageAnalyzer from './image_analyzer';

export default class Welcome extends Component {
	render() {
		const rightButtonConfig = {
			title: 'Next',
			handler: () => this.props.navigator.push({
				component: ImageAnalyzer
			})
		};
		return (
			<View style={styles.container}>
				<NavigationBar title={{title: 'myStories'}} rightButton={rightButtonConfig} />
				<Text style={styles.text}>Welcome to myStories!</Text>
				<Text style={styles.textDetail}>Click Next to begin.</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f8ff',
	},
	text: {
		alignSelf: 'center',
		fontSize: 30,
		marginTop: 200,
		fontFamily: 'Pacifico-Regular',
		color: '#7fabeb'
	},
	textDetail: {
		alignSelf: 'center',
		fontSize: 18,
		marginTop: 10,
		fontFamily: 'Gill Sans',
		color: '#ced6e3'
	}
});
