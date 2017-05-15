import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import { timeStampParser } from '../util/timestamp_parser';
import NavigationBar from 'react-native-navbar';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Story extends Component {
	constructor(props) {
		super(props);
		this.state = {location: null};
	}

	renderLocation() {
		console.log(this.state);
		if (this.state.location) {
			return (
				<Text style={styles.detailText}>{this.props.route.location}</Text>
			);
		}
	}

	render() {
		console.log(timeStampParser(this.props.route.time));
		const leftButtonConfig = {
			title: 'Back',
			handler: () => this.props.navigator.pop(),
		};
		
		const datetime = timeStampParser(this.props.route.time);

		return (
			<View style={styles.container}>
				<NavigationBar title={{ title: 'myStories' }} leftButton={leftButtonConfig} />
				<Text style={styles.text}>
					There {this.props.route.faceData.length > 1 ? 'are ' : 'is '} 
					{this.props.route.faceData.length} 
					{this.props.route.faceData.length > 1 ? ' people' : ' person'} in this photo.
					This was taken near {this.props.route.location} at {datetime[1]} on {datetime[0]}.
				</Text>
				{this.props.route.faceData.map( (person, idx) => {
					return (
						<Text style={styles.detailText} key={person.faceId}>
							Person {idx+1}: {person.faceAttributes.gender === 'male' ? 'He ' : 'She '} 
							appears to be {Math.floor(person.faceAttributes.age)} years old. 
						</Text>
					);
				})}
	
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d6c5ad'
	},
	text: {
		fontSize: 18,
		marginTop: 20,
		alignSelf: 'center'
	},
	detailText: {
		fontSize: 18,
		alignSelf: 'center'
	}
});
