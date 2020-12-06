//Inject script to run natively
var s = document.createElement('script');
s.src = chrome.runtime.getURL('js/inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

function callFunc(func, ...args) {
	argString = args.reduce((l, r) => {
		return JSON.stringify(l) + "," + JSON.stringify(r);
	});
	var s = document.createElement('script');
	s.innerHTML = `${func}(${argString})`;
	(document.head || document.documentElement).appendChild(s);
}


let dropzones = document.querySelectorAll(".dropzone");
let dataIDs = [];
for (let dropzone of dropzones){
	dataIDs.push(dropzone.getAttribute("data-task-id"));
}

chrome.storage.local.set({dropzones: dataIDs}, function() {
	console.log('dropzones saved.');
});


window.addEventListener('load', function() {

	chrome.storage.local.get("files", ({files}) => {
		for (let file of files){
			callFunc("insertFile", 0, file);
		}
	});

});