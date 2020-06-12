//Sketch Premise Generator (aka SketchPremiseGen) v1.4 code
//by Estevan Galvez, 2020

document.getElementById("twCheck").checked = false;

//show stats
document.getElementById("mainText").innerHTML = "When you press the button, preserved items<br>will be moved down below, but they aren't<br>saved when you leave or reload this page,<br>so when you're done, screenshot them.<br><br>"+nouns.length+" nouns, "+adjs.length+" adjectives, "+verbs.length+" verbs,<br>"+temps.length+" templates available. I'm aware this<br>looks like a web page from 1990.<br><br>Dedicated to the <a target=\"_self\" href=\"https:\/\/www.packtheater.com\/\">Pack Theater</a>. Check it out!<br><br><i>wordbank version: "+wordbankVer+"</i>";

//word groups templates array
var wordGroupTemps = [
    "[NOUN] [NOUN]s",
	"[ADJ] [NOUN]s",
	"[NOUN] [NOUN]s",
    "[ADJ] [NOUN]s",
    "[ADJ] [ADJ] [NOUN]s",
    "[ADJ] [NOUN] [NOUN]s",
    "[NOUN] [NOUN] [NOUN]s",
    "The [NOUN] [NOUN]s",
	"The [ADJ] [NOUN]s",
	"The [NOUN] [NOUN]s",
    "The [ADJ] [NOUN]s",
    "The [ADJ] [ADJ] [NOUN]s",
    "The [ADJ] [NOUN] [NOUN]s",
    "The [NOUN] [NOUN] [NOUN]s",
    "The [NOUN] [NOUN]",
	"The [ADJ] [NOUN]",
	"The [NOUN] [NOUN]",
    "The [ADJ] [NOUN]",
    "The [ADJ] [ADJ] [NOUN]",
    "The [ADJ] [NOUN] [NOUN]",
    "The [NOUN] [NOUN] [NOUN]",
    "[NOUN] [NOUN]",
	"[ADJ] [NOUN]",
	"[NOUN] [NOUN]",
    "[ADJ] [NOUN]",
    "[ADJ] [ADJ] [NOUN]",
    "[ADJ] [NOUN] [NOUN]",
    "[NOUN] [NOUN] [NOUN]"
];

//the premise generator
function getPremise() {
	var premise = temps[(Math.random()*temps.length)>>0];
	premise = fillWords(premise);
	return premise.charAt(0).toUpperCase()+premise.slice(1)+".";
}

//get word groups instead function
function getWordGroup() {
    var wordGroup = wordGroupTemps[(Math.random()*wordGroupTemps.length)>>0];
	wordGroup = fillWords(wordGroup);
	return wordGroup+".";
}

//web interface code

var pressedYet = false;
var savedItems = [];
var itemCand = "";
var dispItems = [];

function chkIt(num) {
	if(!document.getElementById("c"+num).checked) {
		document.getElementById("c"+num).checked = true;
	} else {
		document.getElementById("c"+num).checked = false;
	}
}

function genButton() {
	if(!pressedYet) {
		document.getElementById("mainText").innerHTML = "<input type=\"checkbox\" id=\"c1\"><\/input> <span id=\"p1\">NULL<\/span><br><input type=\"checkbox\" id=\"c2\"><\/input> <span id=\"p2\">NULL<\/span><br><input type=\"checkbox\" id=\"c3\"><\/input> <span id=\"p3\">NULL<\/span><br><input type=\"checkbox\" id=\"c4\"><\/input> <span id=\"p4\">NULL<\/span><br><input type=\"checkbox\" id=\"c5\"><\/input> <span id=\"p5\">NULL<\/span><br><input type=\"checkbox\" id=\"c6\"><\/input> <span id=\"p6\">NULL<\/span><br><input type=\"checkbox\" id=\"c7\"><\/input> <span id=\"p7\">NULL<\/span><br><input type=\"checkbox\" id=\"c8\"><\/input> <span id=\"p8\">NULL<\/span><br><input type=\"checkbox\" id=\"c9\"><\/input> <span id=\"p9\">NULL<\/span><br><input type=\"checkbox\" id=\"c10\"><\/input> <span id=\"p10\">NULL<\/span><br><input type=\"checkbox\" id=\"c11\"><\/input> <span id=\"p11\">NULL<\/span><br><input type=\"checkbox\" id=\"c12\"><\/input> <span id=\"p12\">NULL<\/span><br><input type=\"checkbox\" id=\"c13\"><\/input> <span id=\"p13\">NULL<\/span><br><input type=\"checkbox\" id=\"c14\"><\/input> <span id=\"p14\">NULL<\/span><br><input type=\"checkbox\" id=\"c15\"><\/input> <span id=\"p15\">NULL<\/span>";
		updateList();
		pressedYet = true;
	} else {
		flushSaved();
		updateList();
	}
}

function flushSaved() {
	for(var i=1;i<=15;i++) {
		if(document.getElementById("c"+i).checked) {
			savedItems.push(document.getElementById("p"+i).innerHTML);
			document.getElementById("c"+i).checked = false;
		}
	}
	if(savedItems.length >= 1) {
		document.getElementById("saveText").innerHTML = "Preserved items:<br><br>"+savedItems.join("<br>")+"<br><br><a href=\"javascript:clearSaved();\">clear<\/a>";
	}
}

function updateList() {
	dispItems.length = 0;
	for(var i=1;i<=15;i++) {
		if(!document.getElementById("twCheck").checked) {
			itemCand = getPremise();
			while(dispItems.indexOf(itemCand) >= 0) {
				itemCand = getPremise();
			}
			dispItems.push(itemCand);
			document.getElementById("p"+i).innerHTML = itemCand;
		} else {
			itemCand = getWordGroup();
			while(dispItems.indexOf(itemCand) >= 0) {
				itemCand = getWordGroup();
			}
			dispItems.push(itemCand);
			document.getElementById("p"+i).innerHTML = itemCand;
		}
		if(!pressedYet) {
			document.getElementById("p"+i).onclick = chkIt.bind(window,i);
		}
	}
}

function clearSaved() {
	savedItems.length = 0;
	document.getElementById("saveText").innerHTML = "";
}

function clearChecks() {
	if(pressedYet) {
		for(var i=1;i<=15;i++) {
			document.getElementById("c"+i).checked = false;
		}
	}
}

function chkTw() {
	if(!document.getElementById("twCheck").checked) {
		document.getElementById("twCheck").checked = true;
	} else {
		document.getElementById("twCheck").checked = false;
	}
}