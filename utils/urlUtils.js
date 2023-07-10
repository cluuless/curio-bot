function splitURL(url) {
	const urlSplit = url.split('/');
	if (urlSplit.length < 4) {
		console.log(`ERROR: ${url} is an invalid URL.`);
		return null;
	}
	return urlSplit;
}

function getMessageIDFromURL(url) {
	// message id is the last position
	const urlSplit = splitURL(url);
	return (urlSplit !== null) ? urlSplit[urlSplit.length - 1] : null;
}

function getChannelIDFromURL(url) {
	// channel id is the second to last position
	const urlSplit = splitURL(url);
	return (urlSplit !== null) ? urlSplit[urlSplit.length - 2] : null;
}

function getGuildIDFromURL(url) {
	// guild id is the 3rd to last position
	const urlSplit = splitURL(url);
	return (urlSplit !== null) ? urlSplit[urlSplit.length - 3] : null;
}

module.exports = {
	getMessageIDFromURL,
	getChannelIDFromURL,
	getGuildIDFromURL,
};