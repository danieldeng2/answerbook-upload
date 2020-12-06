const displayFiles = ({files}) => {
	const root = document.querySelector("#root");
	root.textContent = "";
	for (let file of files){
		const fileName = document.createElement("p");
		fileName.textContent = file.name;
		root.appendChild(fileName);
	}
};

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve({
		name: file.name,
		lastModifiedDate: file.lastModifiedDate,
		dataURI: reader.result,
	}
	);
	reader.onerror = error => reject(error);
});


let fileInput = document.querySelector("#testFiles");

fileInput.addEventListener('change', async () => {
	let promises = [];
	for (let file of fileInput.files)
		promises.push(toBase64(file));
	
	Promise.all(promises).then(filesData => {
		chrome.storage.local.set({files: filesData}, () => {
			displayFiles({files: filesData});
		});
	});

});

chrome.storage.local.get("files", displayFiles);

