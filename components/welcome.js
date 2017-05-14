import React, { Component } from 'react';
import {
	View,
	StyleSheet
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ImageAnalyzer from './image_analyzer';

export default class Welcome extends Component {
	render() {
		const rightButtonConfig = {
			title: 'Forward',
			handler: () => this.props.navigator.push({
				component: ImageAnalyzer
			})
		};
		return (
			<View style={styles.container}>
				<NavigationBar title={{title: 'myStories'}} rightButton={rightButtonConfig} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d6c5ad'
	}
});
