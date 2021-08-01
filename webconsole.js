// web console

var cin = "";
var outText = "This text set by console's common JS (webconsole.js)";
document.getElementById("consoleOut").innerHTML = outText;

function toConsole() {
	cin = document.getElementById("consoleIn").value.toString();
	if(cin == "" || cin == undefined || cin.length < 1 || cin == " ") {
		document.getElementById("consoleOut").innerHTML = "Bad input.";
		return;
	}
	document.getElementById("consoleIn").value = "";
	document.getElementById("consoleOut").innerHTML = "You said: "+ cin + "\n\nDummy function. Console not actually programmed.";
}