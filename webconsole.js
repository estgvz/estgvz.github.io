// web console

var cin = "";
var textHist = "";
var newText = "";
var nextDirective = "";
var commandSeparator = " ";
var outputSeparator = "\n";
var directiveSeparator = "\n";
var buttonArray = ["A","B","C","D"];

function toConsole() {
	cin = document.getElementById("consoleIn").value.toString();
	//this function defined in the specific program js, not webconsole.js
	thisProgram();
}

function updateConsole() {
	if(textHist == "") {
		textHist = newText;
	} else {
		textHist += commandSeparator+cin+outputSeparator+newText+directiveSeparator+nextDirective;
	}
	document.getElementById("consoleOut").innerHTML = textHist;
	document.getElementById("consoleOut").scrollTop = document.getElementById("consoleOut").scrollHeight;
}

function inConsoleBoxSubmit(e) {
	e.preventDefault();
	toConsole();
}

document.getElementById("consoleForm").addEventListener("submit",inConsoleBoxSubmit);