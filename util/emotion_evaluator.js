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