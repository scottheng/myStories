import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import RNFetchBlob from 'react-native-fetch-blob';

export default class Story extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {location: null};
	}

	componentDidMount() {
		RNFetchBlob.fetch('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true', {
		'Accept': 'application/json',
		'Content-Type': 'application/octet-stream'
		})
		.then(res => {
			return res.json();
		})
		.then(json => {
			if (json.length) {
				this.setState({
					location: json.results[0].formatted_address
				});
			}
			return json;
		});
	}

	render() {
		const leftButtonConfig = {
			title: 'Back',
			handler: () => this.props.navigator.pop(),
		};

		return (
			<View style={styles.container}>
				<NavigationBar title={{ title: 'myStories' }} leftButton={leftButtonConfig} />
				<Text style={styles.text}>
					There {this.props.route.faceData.length > 1 ? 'are ' : 'is '} 
					{this.props.route.faceData.length} 
					{this.props.route.faceData.length > 1 ? ' people' : ' person'} in this photo.
				</Text>
				{this.props.route.faceData.map( (person, idx) => {
					return (
						<Text style={styles.detailText} key={person.faceId}>
							Person {idx+1}: {person.faceAttributes.gender === 'male' ? 'He ' : 'She '} 
							appears to be {Math.floor(person.faceAttributes.age)} years old. 
							{this.state.location}
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
