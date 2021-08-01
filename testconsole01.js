//test program 01 - individual js file. this is all program-specific
//webconsole.js must be loaded before this!

nextDirective = "Yo, it's me, computer. Input command:";
commandSeparator = " ";
outputSeparator = "\n";
directiveSeparator = "\n";

textHist = nextDirective;
document.getElementById("consoleOut").innerHTML = textHist;
document.getElementById("consoleIn").value = "";

var meepCounter = 10;
var seenMeepsMsg = false;

function thisProgram() {
	document.getElementById("consoleIn").value = "";
	cin = cin.trim();
	if(cin.length < 1 || cin == undefined) {
		newText = "Bad input.";
		nextDirective = "Input command:";
		cin = "";
		updateConsole();
		return;
	}
	if(cin.toLowerCase().indexOf("meep") >= 0) {
		if(meepCounter > 2) {
			meepCounter--;
			newText = "You meeped. "+meepCounter+" meeps remain.";
		} else if(meepCounter > 1) {
			meepCounter--;
			newText = "You meeped. You're down to your last meep.";
		} else {
			if(!seenMeepsMsg) {
				newText = "$500 cash prize unlocked! Nice! Claim here: [broken link]";
				seenMeepsMsg = true;
				meepCounter = 0;
			} else {
				newText = "Meeping unavailable due to lack of available meeps.";
			}
		}
		nextDirective = "Input command:";
		updateConsole();
		return;
	}
	newText = "Good input, unfortunately this is not a real program yet. But it knows you said "+cin+".";
	nextDirective = "Input command:";
	updateConsole();
}

function supButton(buttonID) {
	cin = "<<"+buttonArray[parseInt(buttonID,10)-1].toString() + " Button>>";
	thisProgram();
}