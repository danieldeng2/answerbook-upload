let dropzones = document.querySelectorAll(".dropzone");
let dataIDs = [];
for (let dropzone of dropzones){
	dataIDs.push(dropzone.getAttribute("data-task-id"));
}

chrome.storage.local.set({dropzones: dataIDs}, function() {
	console.log('dropzones saved.');
});


var s = document.createElement('script');
s.src = chrome.runtime.getURL('js/inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);