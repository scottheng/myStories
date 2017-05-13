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
				<TouchableHighlight>
					<View>
						<Text>Button</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

AppRegistry.registerComponent('Button', () => Button);