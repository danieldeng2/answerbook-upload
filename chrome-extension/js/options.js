let fileInput = document.querySelector("#testFiles");

fileInput.addEventListener('change', function () {
	console.log(fileInput.files);
});

