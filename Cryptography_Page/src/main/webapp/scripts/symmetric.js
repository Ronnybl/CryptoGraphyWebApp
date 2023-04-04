function resetPage(){
	document.getElementById("symForm").reset();
}
function computeStream(address){
	var okStream = true;
	var boxStream = document.getElementById("streamInput").value;
	var msgStream = "The Error is due to the following reasons:";
	if(boxStream == ""){
		msgStream +="\nNo value provided for Input Value!";
		document.getElementById("stream-input-error").style.display = "inline";
		document.getElementById("stream-input-error").style.color = "red";
		okStream = false;
	}
	else {
		document.getElementById("stream-input-error").style.display = "none";
	}
	boxStream = document.getElementById("streamShift").value;
	if(boxStream == ""){
		msgStream += "\nNo value provided for the key";
		document.getElementById("stream-shift-error").style.display = "inline";
		document.getElementById("stream-shift-error").style.color = "red";
		okStream = false;
	}
	else {
		document.getElementById("stream-shift-error").style.display = "none";
	}
	var checkEqual = document.getElementById("streamInput").value;
	if(checkEqual.length != boxStream.length){
		msgStream +="\nKeys must be of equal size! Text is " + boxStream.length + " and key is " + checkEqual.length;
		document.getElementById("stream-shift-error").style.display = "inline";
		document.getElementById("stream-shift-error").style.color = "red";
		document.getElementById("stream-input-error").style.display = "inline";
		document.getElementById("stream-input-error").style.color = "red";
		okStream = false;
	}
	else{
		document.getElementById("stream-shift-error").style.display = "none";
		document.getElementById("stream-input-error").style.display = "none";

	}
	if (okStream){
		document.getElementById("stream-input-error").style.display = "none";
		document.getElementById("stream-shift-error").style.display = "none";
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
	else {
		alert(msgStream);
	}
}

function computeRC4(address) {
	var okRC4 = true;
	var boxRC4 = document.getElementById("rc4Input").value;
	var msgRC4 = "The Error is due to the following reasons:";
	if(boxRC4 == ""){
		msgRC4 +="\nNo value provided for Input!";
		document.getElementById("rc4-input-error").style.display = "inline";
		document.getElementById("rc4-input-error").style.color = "red";
		okRC4 = false;
	}
	else {
		document.getElementById("rc4-input-error").style.display = "none";
	}
	boxRC4 = document.getElementById("rc4key").value;
	if(boxRC4 == ""){
		msgRC4 += "\nNo value provided for Key!";
		document.getElementById("rc4-key-error").style.display = "inline";
		document.getElementById("rc4-key-error").style.color = "red";
		okRC4 = false;
	}
	else {
		document.getElementById("rc4-key-error").style.display = "none";
	}
	if(okRC4){
		document.getElementById("rc4-key-error").style.display = "none";
		document.getElementById("rc4-input-error").style.display = "none";
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
	else{
		alert(msgRC4);
	}
}

function computeBBS(address) {
	var okBBS = true;
	var boxBBS = document.getElementById("bbsInput").value;
	var msgBBS = "The Error is due to the following reasons:";
	if(boxBBS == ""){
		msgBBS +="\nNo value provided for Input!";
		document.getElementById("bbs-input-error").style.display = "inline";
		document.getElementById("bbs-input-error").style.color = "red";
		okBBS = false;
	}
	else {
		document.getElementById("bbs-input-error").style.display = "none";
	}
	boxBBS = document.getElementById("pVal").value;
	if(isNaN(boxBBS) || boxBBS == ""){
		msgBBS += "\nNo value provided for p!";
		document.getElementById("bbs-p-error").style.display = "inline";
		document.getElementById("bbs-p-error").style.color = "red";
		okBBS = false;
	}
	else {
		document.getElementById("bbs-p-error").style.display = "none";
	}
	boxBBS = document.getElementById("qVal").value;
	if(isNaN(boxBBS) || boxBBS == ""){
		msgBBS +="\nNo value provided for public parameter p!";
		document.getElementById("bbs-q-error").style.display = "inline";
		document.getElementById("bbs-q-error").style.color = "red";
		okBBS = false;
	}
	else {
		document.getElementById("bbs-q-error").style.display = "none";
	}
	boxBBS = document.getElementById("bbsSeed").value;
	if(isNaN(boxBBS) || boxBBS == ""){
		msgBBS +="\nNo value provided for the seed!";
		document.getElementById("bbs-seed-error").style.display = "inline";
		document.getElementById("bbs-seed-error").style.color = "red";
		okBBS = false;
	}
	else {
		document.getElementById("bbs-seed-error").style.display = "none";
	}
	if(okBBS){
		document.getElementById("bbs-input-error").style.display = "none";
		document.getElementById("bbs-p-error").style.display = "none";
		document.getElementById("bbs-q-error").style.display = "none";
		document.getElementById("bbs-seed-error").style.display = "none";

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
	else{
		alert(msgBBS);
	}
}

function computeDES(address){
	var okDES = true;
	var boxDES = document.getElementById("desInput").value;
	var msgDES = "The Error is due to the following reasons:";
	if(boxDES == ""){
		msgDES +="\nNo value provided for Input!";
		document.getElementById("des-input-error").style.display = "inline";
		document.getElementById("des-input-error").style.color = "red";
		okDES = false;
	}
	else {
		document.getElementById("des-input-error").style.display = "none";
	}
	boxDES = document.getElementById("desKey").value;
	if(boxDES == ""){
		msgDES += "\nNo value provided for the key";
		document.getElementById("des-key-error").style.display = "inline";
		document.getElementById("des-key-error").style.color = "red";
		okDES = false;
	}
	else {
		document.getElementById("des-key-error").style.display = "none";
	}
	if (okDES){
		document.getElementById("des-key-error").style.display = "none";
		document.getElementById("des-input-error").style.display = "none";
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
	else{
		alert(msgDES);
	}
}

function computeAES(address){
	var okAES = true;
	var boxAES = document.getElementById("aesInput").value;
	var msgAES = "The Error is due to the following reasons:";
	if(boxAES == ""){
		msgAES +="\nNo value provided for Input!";
		document.getElementById("aes-input-error").style.display = "inline";
		document.getElementById("aes-input-error").style.color = "red";
		okAES = false;
	}
	else {
		document.getElementById("aes-input-error").style.display = "none";
	}
	boxAES = document.getElementById("aesKey").value;
	if(boxAES == ""){
		msgAES += "\nNo value provided for key!";
		document.getElementById("aes-key-error").style.display = "inline";
		document.getElementById("aes-key-error").style.color = "red";
		okAES = false;
	}
	else {
		document.getElementById("aes-key-error").style.display = "none";
	}
	if (okAES){
		document.getElementById("aes-input-error").style.display = "none";
		document.getElementById("aes-key-error").style.display = "none";
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
	else {
		alert(msgAES);
	}
}
function handler(request) {
	if ((request.readyState == 4) && (request.status == 200)){
		var rs=JSON.parse(request.responseText);
		document.getElementById("output").innerHTML = `${rs.output}`;
	}
}