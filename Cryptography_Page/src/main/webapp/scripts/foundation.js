function resetPage(){
	document.getElementById("foundationForm").reset();
}
function computeCaesar(address){
	var okCaesar = true;
	var boxCaesar = document.getElementById("caesarInput").value;
	var msgCaesar = "The Error is due to the following reasons:";
	if(boxCaesar == ""){
		msgCaesar +="\nNo value provided for input!";
		document.getElementById("caesar-input-error").style.display = "inline";
		document.getElementById("caesar-input-error").style.color = "red";
		okCaesar = false;
	}
	else {
		document.getElementById("caesar-input-error").style.display = "none";
	}
	boxCaesar = document.getElementById("caesarShift").value;
	if(isNaN(boxCaesar) || boxCaesar == ""){
		msgCaesar += "\nNo value provided for shift!";
		document.getElementById("caesar-key-error").style.display = "inline";
		document.getElementById("caesar-key-error").style.color = "red";
		okCaesar = false;
	}
	else {
		document.getElementById("caesar-key-error").style.display = "none";
	}
	if (okCaesar){
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
	else{
		alert(msgCaesar);
	}
}

function computeAffine(address) {
	var okAffine = true;
	var boxAffine = document.getElementById("affineInput").value;
	var msgAffine = "The Error is due to the following reasons:";
	if(boxAffine == ""){
		msgAffine +="\nNo value provided for input!";
		document.getElementById("affine-input-error").style.display = "inline";
		document.getElementById("affine-input-error").style.color = "red";
		okAffine = false;
	}
	else {
		document.getElementById("affine-input-error").style.display = "none";
	}
	boxAffine = document.getElementById("affineAlpha").value;
	if(isNaN(boxAffine) || boxAffine == ""){
		msgAffine += "\nNo value provided for alpha!";
		document.getElementById("affine-alpha-error").style.display = "inline";
		document.getElementById("affine-alpha-error").style.color = "red";
		okAffine = false;
	}
	else {
		document.getElementById("affine-alpha-error").style.display = "none";
	}
	boxAffine = document.getElementById("affineBeta").value;
	if(isNaN(boxAffine) || boxAffine == ""){
		msgAffine +="\nNo value provided for beta!";
		document.getElementById("affine-beta-error").style.display = "inline";
		document.getElementById("affine-beta-error").style.color = "red";
		okAffine = false;
	}
	else {
		document.getElementById("affine-beta-error").style.display = "none";
	}
	if(okAffine){
		document.getElementById("affine-input-error").style.display = "none";
		document.getElementById("affine-alpha-error").style.display = "none";
		document.getElementById("affine-beta-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "text=" + document.getElementById("affineInput").value + "&";
		data += "alpha=" + document.getElementById("affineAlpha").value + "&";
		data += "beta=" + document.getElementById("affineBeta").value + "&";
		data += "process=" + document.querySelector('input[name="affineProcess"]:checked').value;
		console.log(address + "&" + data);
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			handler(request)
		};
		request.send(null);
	}
	else{
		alert(msgAffine);
	}
}

function computeVigenere(address) {
	var okVigenere = true;
	var boxVigenere = document.getElementById("vigenereInput").value;
	var msgVigenere = "The Error is due to the following reasons:";
	if(boxVigenere == ""){
		msgVigenere +="\nNo value provided for input!";
		document.getElementById("vigenere-input-error").style.display = "inline";
		document.getElementById("vigenere-input-error").style.color = "red";
		okVigenere = false;
	}
	else {
		document.getElementById("vigenere-input-error").style.display = "none";
	}
	boxVigenere = document.getElementById("vigenereKey").value;
	if(boxVigenere == ""){
		msgVigenere += "\nNo value provided for key!";
		document.getElementById("vigenere-key-error").style.display = "inline";
		document.getElementById("vigenere-key-error").style.color = "red";
		okVigenere = false;
	}
	else {
		document.getElementById("vigenere-key-error").style.display = "none";
	}
	if (okVigenere){
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
	else{
		alert(msgVigenere);
	}
}

function handler(request) {
	if ((request.readyState == 4) && (request.status == 200)){
		var rs=JSON.parse(request.responseText);
		document.getElementById("output").innerHTML = `${rs.output}`;
	}
}