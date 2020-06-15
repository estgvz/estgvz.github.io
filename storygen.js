//Story Generator v1.5 code
//by Estevan Galvez, 2020

//show stats
document.getElementById("mainText").innerHTML = "TIP: Even once full premises have been generated,<br>they're regenerated with new inciting incidents<br>every time you press the button, allowing you to<br>try as many new inciting incidents as you want.<br><br>NOTE: None of these are saved, so write down<br>your favorites somewhere.<br><br>"+nouns.length+" nouns, "+adjs.length+" adjectives, "+verbs.length+" verbs,<br>"+(temps1.length+temps2.length)+" templates available. I'm aware this<br>looks like a web page from 1990.<br><br>Dedicated to the <a target=\"_self\" href=\"https:\/\/www.packtheater.com\/\">Pack Theater</a>. Check it out!<br><br><i>wordbank version: "+wordbankVer+"</i>";

//as of 1.5, this uses separate functions for starts and inciting incidents (way more logical)

//start-generating function

function getStart() {
	var startString = "";
	//randomly determine if 1 or 2 lead characters will be specified
	if(!((Math.random()*2)>>0)) {
		//one lead described
		startString = temps1[(Math.random()*temps1.length)>>0];
		startString = fillWords(startString)+".";
	} else {
		//two leads described
		var temps1Copy = temps1.slice(0);
		startString = temps1Copy.splice((Math.random()*temps1Copy.length)>>0,1)[0]+", and "+temps1Copy.splice((Math.random()*temps1Copy.length)>>0,1)[0].replace("(NAME)","(NAME 2)");
		startString = fillWords(startString)+".";
	}
	return startString;
}

//inciting incident writing function

function getII() {
	var iString = temps2[(Math.random()*temps2.length)>>0];
	return "One day, "+fillWords(iString)+" and it changes everything.";
}

//web interface code

var butClicks = 0;
var savedItems = [];
var premsString = "";
var newPrem = "";
var targetBase = "";
var dispItems = [];
var branchItems = [];
var itemCand = "";
var branchCand = "";
var numBranches = 10;

function chkIt(num) {
	if(!document.getElementById("c"+num).checked) {
		document.getElementById("c"+num).checked = true;
	} else {
		document.getElementById("c"+num).checked = false;
	}
}

function genButton() {
	if(butClicks < 1) {
		document.getElementById("mainText").innerHTML = "<input type=\"checkbox\" id=\"c1\"><\/input> <span id=\"p1\">NULL<\/span><br><input type=\"checkbox\" id=\"c2\"><\/input> <span id=\"p2\">NULL<\/span><br><input type=\"checkbox\" id=\"c3\"><\/input> <span id=\"p3\">NULL<\/span><br><input type=\"checkbox\" id=\"c4\"><\/input> <span id=\"p4\">NULL<\/span><br><input type=\"checkbox\" id=\"c5\"><\/input> <span id=\"p5\">NULL<\/span><br><input type=\"checkbox\" id=\"c6\"><\/input> <span id=\"p6\">NULL<\/span><br><input type=\"checkbox\" id=\"c7\"><\/input> <span id=\"p7\">NULL<\/span><br><input type=\"checkbox\" id=\"c8\"><\/input> <span id=\"p8\">NULL<\/span><br><input type=\"checkbox\" id=\"c9\"><\/input> <span id=\"p9\">NULL<\/span><br><input type=\"checkbox\" id=\"c10\"><\/input> <span id=\"p10\">NULL<\/span><br><input type=\"checkbox\" id=\"c11\"><\/input> <span id=\"p11\">NULL<\/span><br><input type=\"checkbox\" id=\"c12\"><\/input> <span id=\"p12\">NULL<\/span><br><input type=\"checkbox\" id=\"c13\"><\/input> <span id=\"p13\">NULL<\/span><br><input type=\"checkbox\" id=\"c14\"><\/input> <span id=\"p14\">NULL<\/span><br><input type=\"checkbox\" id=\"c15\"><\/input> <span id=\"p15\">NULL<\/span>";
		updateList();
	} else {
		updateList();
	}
	butClicks++;
}

function updateList() {
	dispItems.length = 0;
	for(var i=1;i<=15;i++) {
        if(butClicks < 1) {
			itemCand = getStart();
			while (dispItems.indexOf(itemCand) >= 0) {
				itemCand = getStart();
			}
			dispItems.push(itemCand);
			document.getElementById("p"+i).innerHTML = itemCand;
            document.getElementById("p"+i).onclick = chkIt.bind(window,i);
        } else {
            if(document.getElementById("c"+i).checked) {
				if(savedItems.indexOf(document.getElementById("p"+i).innerHTML) < 0) {
					savedItems.unshift(document.getElementById("p"+i).innerHTML);
					while (savedItems.length > 15) {
						savedItems.pop();
					}
				}
				document.getElementById("c"+i).checked = false;
				itemCand = getStart();
				while(dispItems.indexOf(itemCand) >= 0) {
					itemCand = getStart();
				}
				dispItems.push(itemCand);
                document.getElementById("p"+i).innerHTML = itemCand;
            } else {
				itemCand = getStart();
				while(dispItems.indexOf(itemCand) >= 0) {
					itemCand = getStart();
				}
				dispItems.push(itemCand);
                document.getElementById("p"+i).innerHTML = itemCand;
            }
        }
	}
    if(savedItems.length > 0) {
        updateBranches();
    }
}

function updateBranches() {
	premsString = "";
	targetBase = "";
	newPrem = "";
	for(var i = 0; i < savedItems.length; i++) {
		branchItems.length = 0;
		targetBase = savedItems[i];
		for(var k=0;k<numBranches;k++) {
			branchCand = getII();
			while(branchItems.indexOf(branchCand) >= 0) {
				branchCand = getII();
			}
			branchItems.push(branchCand);
			newPrem = targetBase+" "+branchCand;
			premsString += newPrem;
			if(k < numBranches-1) {
				premsString += "<br>";
			}
		}
		if(i < savedItems.length-1) {
			premsString += "<br><br>";
		}
	}
	document.getElementById("premsText").innerHTML = premsString;
}

function clearChecks() {
	if(butClicks > 0) {
		for(var i=1;i<=15;i++) {
			document.getElementById("c"+i).checked = false;
		}
	}
}

function clearAll() {
    if(butClicks > 0) {
		savedItems.length = 0;
		dispItems.length = 0;
        premsString = "";
        document.getElementById("premsText").innerHTML = "";
    }
}