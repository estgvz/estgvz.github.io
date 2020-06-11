//Sketch Premise Generator (aka SketchPremiseGen) v1.4 ALT code
//by Estevan Galvez, 2020

//show stats
document.getElementById("mainText").innerHTML = "NOTE: None of these are saved when you<br>leave or reload this page, so write down<br>your favorites somewhere.<br><br>"+nouns.length+" nouns, "+adjs.length+" adjectives, "+verbs.length+" verbs,<br>"+temps.length+" templates available. I'm aware this<br>looks like a web page from 1990.<br><br>Dedicated to the <a target=\"_self\" href=\"https:\/\/www.packtheater.com\/\">Pack Theater</a>. Check it out!<br><br><i>wordbank version: "+wordbankVer+"</i>";

//the premise generator

function getPremise() {
	var premise = temps[(Math.random()*temps.length)>>0];
	
	var adjsCopy = adjs.slice(0);
	var nounsCopy = nouns.slice(0);
	var verbsCopy = verbs.slice(0);
	
	var adjPicks = [];
	var nounPicks = [];
	var verbPicks = [];
	
	for(var i=0;i<5;i++) {
		adjPicks.push(adjsCopy.splice((Math.random()*adjsCopy.length)>>0,1)[0]);
		nounPicks.push(nounsCopy.splice((Math.random()*nounsCopy.length)>>0,1)[0]);
		verbPicks.push(verbsCopy.splice((Math.random()*verbsCopy.length)>>0,1)[0]);
	}
	
	for(var i=0;i<5;i++) {
		premise = premise.replace("[ADJ]",adjPicks[i].toUpperCase());
		premise = premise.replace("[NOUN]",nounPicks[i].toUpperCase());
		premise = premise.replace("[VERB]",verbPicks[i].toUpperCase());
	}
	
	return premise.charAt(0).toUpperCase()+premise.slice(1)+".";
}

//web interface code

var pressedYet = false;
var savedItems = [];

function genButton() {
	if(!pressedYet) {
		updateList();
		pressedYet = true;
	} else {
		updateList();
	}
}

var premsArray = [];
var premsString = "";
var newPrem = "";

function updateList() {
	premsString = "";
	newPrem = "";
	for(var i=1;i<=15;i++) {
		newPrem = getPremise();
		while(premsArray.indexOf(newPrem) !== -1) {
			newPrem = getPremise();
		}
		premsArray.unshift(newPrem);
	}
	while(premsArray.length > 30) {
		premsArray.pop();
	}
	premsString = premsArray.join("<br>");
	document.getElementById("mainText").innerHTML = premsString;
}