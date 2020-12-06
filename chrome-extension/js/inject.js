let dropzones = document.querySelectorAll(".dropzone");

function insertFile(dropzonesNum, file){
	console.log(dropzonesNum);
  let blob = dataURItoBlob(file.dataURI);
  blob.lastModifiedDate = file.lastModifiedDate;
	blob.name = file.name;
	
	dropzones[dropzonesNum].dropzone.addFile(blob);
}


function dataURItoBlob(dataURI) {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ab], {type: mimeString});
}