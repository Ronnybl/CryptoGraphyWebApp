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

function computeEA(address) {
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

function computeEEA(address) {
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

function computeMRPT(address){
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

function computeRSA(address) {
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

function asymHandler(request) {
	if ((request.readyState == 4) && (request.status == 200)){
		var rs=JSON.parse(request.responseText);
		console.log(request.responseText);
		document.getElementById("output").innerHTML = `${rs.output}`;
	}
}