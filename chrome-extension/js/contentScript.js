let dropzones = document.querySelectorAll(".dropzone");
let dataIDs = [];
for (let dropzone of dropzones){
	dataIDs.push(dropzone.getAttribute("data-task-id"));
}

chrome.storage.local.set({dropzones: dataIDs}, function() {
	// message('dropzones saved.');
});