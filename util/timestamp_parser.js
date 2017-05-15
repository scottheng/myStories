export const timeStampParser = (timestamp) => {
	let date = new Date(timestamp);
	return date.toLocaleString().split(',');
};