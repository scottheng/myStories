import React, {Component} from 'react';

import {
	AppRegistry,
	Text,
	View,
	TouchableHighlight
} from 'react-native';

export default class Button extends Component {
	render() {
		return (
			<View>
				<TouchableHighlight onPress={this.props.onPress} style={this.props.buttonStyles}>
					<View>
						<Text style={this.props.buttonTextStyles}>{this.props.text}</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

AppRegistry.registerComponent('Button', () => Button);