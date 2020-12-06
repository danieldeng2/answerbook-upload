chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: '127.0.0.1'},
			}),
			new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'answerbook.doc.ic.ac.uk'},
			})
			],
					actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});	
});