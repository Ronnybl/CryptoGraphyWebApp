function resetPage(){
	document.getElementById("symForm").reset();
}
function computeStream(address){
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("streamInput").value + "&";
	data += "key=" + document.getElementById("streamShift").value + "&";
	data += "mod=" + document.querySelector('input[name="streamBase"]:checked').value + "&";
	data += "process=" + document.querySelector('input[name="streamProcess"]:checked').value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeRC4(address) {
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("rc4Input").value + "&";
	data += "key=" + document.getElementById("rc4key").value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeBBS(address) {
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("bbsInput").value + "&";
	data += "p=" + document.getElementById("pVal").value + "&";
	data += "q=" + document.getElementById("qVal").value + "&";
	data += "seed=" + document.getElementById("bbsSeed").value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeDES(address){
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("desInput").value + "&";
	data += "key=" + document.getElementById("desKey").value + "&";
	data += "process=" + document.querySelector('input[name="desProcess"]:checked').value;
	request.open("GET", (address + "&" + data), true);
	request.onreadystatechange = function() {
		handler(request)
	};
	request.send(null);
}

function computeAES(address){
	var request = new XMLHttpRequest();
	var data = '';
	data += "text=" + document.getElementById("aesInput").value + "&";
	data += "key=" + document.getElementById("aesKey").value + "&";
	data += "process=" + document.querySelector('input[name="aesProcess"]:checked').value;
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