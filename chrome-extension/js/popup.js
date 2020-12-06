let button = document.querySelector('button');
button.addEventListener("click", () => {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		for (let tab of tabs){
			chrome.tabs.sendMessage(tab.id, {uploadAll: true}, function(response) {
				console.log(response);
			});
		}
	});

});