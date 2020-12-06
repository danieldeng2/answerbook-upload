let root = document.querySelector('#root');

chrome.storage.local.get("dropzones", function({dropzones}) {
	for (let dropzone of dropzones){
		const dropzonePara = document.createElement("p"); 
		dropzonePara.textContent = dropzone;
		root.appendChild(dropzonePara);
	}
});