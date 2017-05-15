import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import { timeStampParser } from '../util/timestamp_parser';
import { emotionEvaluator } from '../util/emotion_evaluator';
import NavigationBar from 'react-native-navbar';
import RNFetchBlob from 'react-native-fetch-blob';
import lodash from 'lodash';
import MapView from 'react-native-maps';

export default class Story extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
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
		console.log(emotionEvaluator(lodash.values(this.props.route.faceData[0].faceAttributes.emotion)));
		const leftButtonConfig = {
			title: 'Back',
			handler: () => this.props.navigator.pop(),
		};

		const emotionString = (emotionArray) => {
			let emotionIndex = emotionEvaluator(lodash.values(emotionArray));
			switch(emotionIndex) {
				case 0:
					return 'angry';
				case 1:
					return 'contempt';
				case 2:
					return 'disgusted';
				case 3:
					return 'fearful';
				case 4:
					return 'happy';
				case 5:
					return 'neutral';
				case 6:
					return 'sad';
				case 7:
					return 'surprised';
			}
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
							Based on {person.faceAttributes.gender === 'male' ? 'his' : 'her'} facial expression,
							{person.faceAttributes.gender === 'male' ? ' he' : ' she'} is feeling {emotionString(person.faceAttributes.emotion)}.
						</Text>
					);
				})}
				<MapView
					style={styles.map}
					initialRegion={{
					latitude: this.props.route.geolocation[0] ? this.props.route.geolocation[0] : 37.788545,
					longitude: this.props.route.geolocation[1] ? this.props.route.geolocation[1] : -122.406809,
					latitudeDelta: 0.0008,
					longitudeDelta: 0.0008,
					}}
				>
					<MapView.Marker 
						coordinate={{latitude: this.props.route.geolocation[0] ? this.props.route.geolocation[0] : 37.788545,
									longitude: this.props.route.geolocation[1] ? this.props.route.geolocation[1] : -122.406809}}
					/>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f8ff'
	},
	text: {
		fontSize: 18,
		margin: 20,
		alignSelf: 'center',
		color: '#f6c1d7',
		fontFamily: 'Gill Sans'
	},
	detailText: {
		fontSize: 18,
		margin: 10,
		alignSelf: 'center',
		color: '#7fabeb',
		fontFamily: 'Gill Sans'
	},
	map: {
		marginTop: 5,
		width: '40%',
		height: '40%',
		alignSelf: 'center'
	}
});
