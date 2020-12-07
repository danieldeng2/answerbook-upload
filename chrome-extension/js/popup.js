const uploadButton = document.querySelector('#upload');
uploadButton.addEventListener("click", () => {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		for (let tab of tabs){
			chrome.tabs.sendMessage(tab.id, {uploadAll: true}, function(response) {
				console.log(response);
			});
		}
	});

});

const fileButton = document.querySelector("#file");

fileButton.addEventListener("click", () => {
  chrome.windows.create({
    url: chrome.runtime.getURL("choosefile.html"),
    type: "popup"
  }, function(win) {
    // win represents the Window object from windows API
  });
});

const displayFiles = ({files}) => {
	const root = document.querySelector("#root");
	root.textContent = "";
	for (let file of files){
		const fileName = document.createElement("p");
		fileName.textContent = file.name;
		root.appendChild(fileName);
	}
};
chrome.storage.local.get("files", displayFiles);