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
for (let dropzone of dropzones){
	const filePattern = dropzone.getAttribute("data-task-id");
	const fileNameLabel = document.createElement("p");
	const parent = dropzone.querySelector(".dz-message");

	fileNameLabel.textContent = `Batch: ans-${filePattern}`;
	fileNameLabel.style.color = "blue";
	parent.appendChild(fileNameLabel);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		if (request.uploadAll){

			let dropzonesNum = 0;
			chrome.storage.local.get("files", ({files}) => {
				for (let file of files){
					for (dropzonesNum = 0; dropzonesNum < dropzones.length; dropzonesNum++){
						const filePattern = dropzones[dropzonesNum].getAttribute("data-task-id");
						if (file.name.startsWith(`ans-${filePattern}`)){
							callFunc("insertFile", dropzonesNum, file);
							break;
						}
					}
				}
			});
			
		}
	});