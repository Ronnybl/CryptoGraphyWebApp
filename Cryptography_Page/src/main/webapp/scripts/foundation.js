function resetPage(){
	document.getElementById("foundationForm").reset();
}
function computeCaesar(address){
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("caesarInput").value + "&";
	data += "key=" + document.getElementById("caesarShift").value + "&";
	data += "process=" + document.querySelector('input[name="caesarProcess"]:checked').value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeAffine(address) {
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("affineInput").value + "&";
	data += "affineAlpha=" + document.getElementById("affineAlpha").value + "&";
	data += "beta=" + document.getElementById("affineBeta").value + "&";
	data += "process=" + document.querySelector('input[name="affineProcess"]:checked').value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeVigenere(address) {
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("vigenereInput").value + "&";
	data += "key=" + document.getElementById("vigenereKey").value + "&";
	data += "process=" + document.querySelector('input[name="vigenereProcess"]:checked').value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function handler(request) {
	if ((request.readyState == 4) && (request.status == 200)){
		var rs=JSON.parse(request.responseText);
		document.getElementById("output").innerHTML = `${rs.output}`;
	}
}