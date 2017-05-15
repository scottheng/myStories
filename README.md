# myStories

**[View Demo Video](https://www.youtube.com/watch?v=vebACTn0tUo&feature=youtu.be)**

myStories is a mobile app that allows you to use select a selfie or photo of people from your phone's photo gallery and generate a 'story' from metadata. 

To view the app on XCode Simulator, first run `npm install` and then run `react-native run-ios`. You will need to seed the simulator with photos from the simulator browser because the simulator doesn't have stock photos with faces. You can do this by opening Safari, googling for images, and `Save Photo` to save in the photo gallery.

## Technologies and Implementation
This app was built using React Native and features the **[Face Detection API](https://azure.microsoft.com/en-us/services/cognitive-services/?ranMID=24542&ranEAID=TnL5HPStwNw&ranSiteID=TnL5HPStwNw-6zfbY8hw5bQrBGGc0ougfg&tduid=%28506aa5b7f3e464de3bfaeb574d3432a7%29%28256380%29%282459594%29%28TnL5HPStwNw-6zfbY8hw5bQrBGGc0ougfg%29%28%29)** from Microsoft Cognitive Services. 

#### MVP features

- Allow users to select photo from library and display photo in app
- Query for photo metadata (location, time) 
- Use Face Detection API from Microsoft Cognitive Services 
- Use location to display photo on a map

### Select Photo from Camera Roll
When opening the app, the user is presented with a button that will allow the user to access their camera roll. I used the `react-native-image-picker` module to implement this. Upon successful selection of a photo, I store the following data in the componenet state:

```javascript
{
photo_style: {
	position: 'relative',
	width: 360,
	height: 360,
	alignSelf: 'center'
},
hasPhoto: true,
photo: {uri: response.uri},
photoData: response.data,
time: response.timestamp,
geolocation: [response.latitude, response.longitude]
}
```

### Use Face Detection API to Retrieve Face Attributes
```javascript
RNFetchBlob.fetch('POST', 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,emotion', {
'Accept': 'application/json',
'Content-Type': 'application/octet-stream',
'Ocp-Apim-Subscription-Key': apiKey
}, this.state.photoData)
```
I sent a `POST` request to the API with the photo data returned from the `ImagePicker`. The request returned a response that had information about each face's age, gender, and emotion. I used the length of the response array to determine the number of faces in the photo and generated the appropriate pronouns based on the gender. For the emotions, I iterated through the emotion array for each person and returned the index of the emotion with the max score. I used switch cases on the index to render the appropriate emotion.

```javascript
export const emotionEvaluator = (emotionScores) => {
	let maxEmotion = 0;
	let maxIndex = 0;
	for (let i = 0; i < emotionScores.length; i++) {
		if (emotionScores[i] > maxEmotion) {
			maxEmotion = emotionScores[i];
			maxIndex = i;
		}
	}
	return maxIndex;
};
```

### Display Photo Location on Map
I used `react-native-maps` to render a map using the coordinates, if given, of the photo.

## Future Todos
I wanted to use the geolocation and timestamp of the photo to query for weather information from a Weather API. I think this would be an interesting detail to have in the Story. 

It would also be nice to disable the `Create Story` button or generate a loading screen page after the button has been clicked.