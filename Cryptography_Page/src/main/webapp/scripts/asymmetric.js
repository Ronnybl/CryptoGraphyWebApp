function resetPage(){
	console.log("RESETTING PAGE");
	document.getElementById("asymForm").reset();
}
function rsaEncryptOption(){
	document.getElementById('eVal').style.display = 'block';
	document.getElementById('eVallbl').style.display = 'block';
	document.getElementById('dVal').style.display = 'none';
	document.getElementById('dVallbl').style.display = 'none';
}
function rsaDecryptOption(){
	document.getElementById('eVal').style.display = 'none';
	document.getElementById('eVallbl').style.display = 'none';
	document.getElementById('dVal').style.display = 'block';
	document.getElementById('dVallbl').style.display = 'block';
}

function computeDH(address){
	var okDH = true;
	var boxDH = document.getElementById("user1").value;
	var msgDH = "The Error is due to the following reasons:";
	if(isNaN(boxDH) || boxDH == ""){
		msgDH +="\nNo value provided for First User!";
		document.getElementById("dh-user1-error").style.display = "inline";
		document.getElementById("dh-user1-error").style.color = "red";
		okDH = false;
	}
	else {
		document.getElementById("dh-user1-error").style.display = "none";
	}
	boxDH = document.getElementById("user2").value;
	if(isNaN(boxDH) || boxDH == ""){
		msgDH += "\nNo value provided for Second User!";
		document.getElementById("dh-user2-error").style.display = "inline";
		document.getElementById("dh-user2-error").style.color = "red";
		okDH = false;
	}
	else {
		document.getElementById("dh-user2-error").style.display = "none";
	}
	boxDH = document.getElementById("publicP").value;
	if(isNaN(boxDH) || boxDH == ""){
		msgDH +="\nNo value provided for public parameter p!";
		document.getElementById("dh-p-error").style.display = "inline";
		document.getElementById("dh-p-error").style.color = "red";
		okDH = false;
	}
	else {
		document.getElementById("dh-p-error").style.display = "none";
	}
	boxDH = document.getElementById("publicAlpha").value;
	if(isNaN(boxDH) || boxDH == ""){
		msgDH +="\nNo value provided for public parameter Alpha!";
		document.getElementById("dh-alpha-error").style.display = "inline";
		document.getElementById("dh-alpha-error").style.color = "red";
		okDH = false;
	}
	else {
		document.getElementById("dh-alpha-error").style.display = "none";
	}
	if(okDH){
		document.getElementById("dh-user1-error").style.display = "none";
		document.getElementById("dh-user2-error").style.display = "none";
		document.getElementById("dh-p-error").style.display = "none";
		document.getElementById("dh-alpha-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "publicP=" + document.getElementById("publicP").value + "&";
		data += "publicAlpha=" + document.getElementById("publicAlpha").value + "&";
		data += "privateA=" + document.getElementById("user1").value + "&";
		data += "privateB=" + document.getElementById("user2").value;
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			asymHandler(request)
		};
		request.send(null);
	}
	else {
		alert(msgDH);
	}
}

function computeEA(address) {
	var okEA = true;
	var boxEA = document.getElementById("num1").value;
	var msgEA = "The Error is due to the following reasons:";
	if(isNaN(boxEA) || boxEA == ""){
		msgEA +="\nNo value provided for First Value!";
		document.getElementById("ea-num1-error").style.display = "inline";
		document.getElementById("ea-num1-error").style.color = "red";
		okEA = false;
	}
	else {
		document.getElementById("ea-num1-error").style.display = "none";
	}
	boxEA = document.getElementById("num2").value;
	if(isNaN(boxEA) || boxEA == ""){
		msgEA += "\nNo value provided for Second Value!";
		document.getElementById("ea-num2-error").style.display = "inline";
		document.getElementById("ea-num2-error").style.color = "red";
		okEA = false;
	}
	else {
		document.getElementById("ea-num2-error").style.display = "none";
	}
	if (okEA){
		document.getElementById("ea-num1-error").style.display = "none";
		document.getElementById("ea-num2-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "bigx=" + document.getElementById("num1").value + "&";
		data += "bigy=" + document.getElementById("num2").value;
			console.log("EA CALLED WITH " + address + "&" + data);
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			asymHandler(request)
		};
		request.send(null);
	}
	else {
		alert(msgEA);
	}
}

function computeEEA(address) {
	var okEEA = true;
	var boxEEA = document.getElementById("eeanum1").value;
	var msgEEA = "The Error is due to the following reasons:";
	if(isNaN(boxEEA) || boxEEA == ""){
		msgEEA +="\nNo value provided for X!";
		document.getElementById("eea-x-error").style.display = "inline";
		document.getElementById("eea-x-error").style.color = "red";
		okEEA = false;
	}
	else {
		document.getElementById("eea-x-error").style.display = "none";
	}
	boxEEA = document.getElementById("eeanum2").value;
	if(isNaN(boxEEA) || boxEEA == ""){
		msgEEA += "\nNo value provided for Y!";
		document.getElementById("eea-y-error").style.display = "inline";
		document.getElementById("eea-y-error").style.color = "red";
		okEEA = false;
	}
	else {
		document.getElementById("eea-y-error").style.display = "none";
	}
	boxEEA = document.getElementById("eeanum3").value;
	if(isNaN(boxEEA) || boxEEA == ""){
		msgEEA +="\nNo value provided for public parameter p!";
		document.getElementById("eea-x1-error").style.display = "inline";
		document.getElementById("eea-x1-error").style.color = "red";
		okEEA = false;
	}
	else {
		document.getElementById("eea-x1-error").style.display = "none";
	}
	boxEEA = document.getElementById("eeanum4").value;
	if(isNaN(boxEEA) || boxEEA == ""){
		msgEEA +="\nNo value provided for public parameter Alpha!";
		document.getElementById("eea-y1-error").style.display = "inline";
		document.getElementById("eea-y1-error").style.color = "red";
		okEEA = false;
	}
	else {
		document.getElementById("eea-y1-error").style.display = "none";
	}
	if(okEEA){
		document.getElementById("eea-x-error").style.display = "none";
		document.getElementById("eea-y-error").style.display = "none";
		document.getElementById("eea-x1-error").style.display = "none";
		document.getElementById("eea-y1-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "bigx=" + document.getElementById("eeanum1").value + "&";
		data += "bigy=" + document.getElementById("eeanum2").value + "&";
		data += "bigx1=" + document.getElementById("eeanum3").value + "&";
		data += "bigy1=" + document.getElementById("eeanum4").value;
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			asymHandler(request)
		};
		request.send(null);
	}
	else {
		alert(msgEEA);
	}
}

function computeMRPT(address){
	var okMR = true;
	var boxMR = document.getElementById("mrNum").value;
	if(isNaN(boxMR) || boxMR == ""){
		alert("Missing value!")
		document.getElementById("mr-num-error").style.display = "inline";
		document.getElementById("mr-num-error").style.color = "red";
		okMR = false;
	}
	else {
		document.getElementById("mr-num-error").style.display = "none";
	}
	if(okMR){
		document.getElementById("mr-num-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "num=" + document.getElementById("mrNum").value + "&";
		data += "base=" + document.querySelector('input[name="mrBase"]:checked').value;
		console.log("MRPT CALLED WITH " + address + "&" + data);
		console.log(data);
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			console.log("MRPT RESPONSE:" + request.responseText);
			asymHandler(request)
		};
		request.send(null);
	}
}

function computeRSA(address) {
	var okRSA = true;
	var boxRSA = document.getElementById("textInput").value;
	var radioRSA = document.getElementById("encrypt").checked;
	var msgRSA = "The Error is due to the following reasons:";
	if(isNaN(boxRSA) || boxRSA == ""){
		msgRSA +="\nNo value provided for Input!";
		document.getElementById("rsa-text-error").style.display = "inline";
		document.getElementById("rsa-text-error").style.color = "red";
		okRSA = false;
	}
	else {
		document.getElementById("rsa-text-error").style.display = "none";
	}
	boxEA = document.getElementById("eVal").value;
	if(radioRSA && (isNaN(boxEA) || boxEA == "")){
		msgRSA += "\nNo value provided for e value!";
		document.getElementById("rsa-e-error").style.display = "inline";
		document.getElementById("rsa-e-error").style.color = "red";
		okRSA = false;
	}
	else {
		document.getElementById("rsa-e-error").style.display = "none";
	}
	boxEA = document.getElementById("dVal").value;
	radioRSA = document.getElementById("decrypt").checked;
	if(radioRSA && (isNaN(boxEA) || boxEA == "")){
		msgRSA += "\nNo value provided for d value!";
		document.getElementById("rsa-d-error").style.display = "inline";
		document.getElementById("rsa-d-error").style.color = "red";
		okRSA = false;
	}
	else {
		document.getElementById("rsa-d-error").style.display = "none";
	}
	if (okRSA){
		document.getElementById("rsa-text-error").style.display = "none";
		document.getElementById("rsa-e-error").style.display = "none";
		document.getElementById("rsa-d-error").style.display = "none";
		var request = new XMLHttpRequest();
		var data = '';
		data += "text=" + document.getElementById("textInput").value + "&";
		data += "n=" + document.getElementById("mod").value + "&";
		data += "process=" + document.querySelector('input[name="process"]:checked').value + "&";
		data += "e=" + document.getElementById("eVal").value + "&";
		data += "d=" + document.getElementById("dVal").value;
		request.open("GET", (address + "&" + data), true);
		request.onreadystatechange = function() {
			asymHandler(request)
		};
		request.send(null);
	}
	else {
		alert(msgRSA);
	}
}

function asymHandler(request) {
	if ((request.readyState == 4) && (request.status == 200)){
		console.log(request.responseText);
		var rs=JSON.parse(request.responseText);
		document.getElementById("output").innerHTML = `${rs.output}`;
	}
}