module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,php,json,txt,js}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};