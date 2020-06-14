//Story Generator v1.4 ALT code
//by Estevan Galvez, 2020

//show stats
document.getElementById("mainText").innerHTML = "NOTE: None of these are saved, so write down<br>your favorites somewhere.<br><br>"+nouns.length+" nouns, "+adjs.length+" adjectives, "+verbs.length+" verbs,<br>"+(temps1.length+temps2.length)+" templates available. I'm aware this<br>looks like a web page from 1990.<br><br>Dedicated to the <a target=\"_self\" href=\"https:\/\/www.packtheater.com\/\">Pack Theater</a>. Check it out!<br><br><i>wordbank version: "+wordbankVer+"</i>";

//the premise generator

function getPremise() {
	var p1 = (Math.random()*temps1.length)>>0;
	var p2 = (Math.random()*temps1.length)>>0;
	while(p2 == p1) {
		p2 = (Math.random()*temps1.length)>>0;
	}
	var premise = temps1[p1]+", and (NAME 2)"+temps1[p2].slice(6)+". One day, "+temps2[(Math.random()*temps2.length)>>0];
	
	var adjsCopy = adjs.slice(0);
	var nounsCopy = nouns.slice(0);
	var verbsCopy = verbs.slice(0);
	
	var adjPicks = [];
	var nounPicks = [];
	var verbPicks = [];
	
	for(var i=0;i<12;i++) {
		adjPicks.push(adjsCopy.splice((Math.random()*adjsCopy.length)>>0,1)[0]);
		nounPicks.push(nounsCopy.splice((Math.random()*nounsCopy.length)>>0,1)[0]);
		verbPicks.push(verbsCopy.splice((Math.random()*verbsCopy.length)>>0,1)[0]);
	}
	
	for(var i=0;i<12;i++) {
		premise = premise.replace("[ADJ]",adjPicks[i].toUpperCase());
		premise = premise.replace("[NOUN]",nounPicks[i].toUpperCase());
		premise = premise.replace("[VERB]",verbPicks[i].toUpperCase());
	}
	
	return premise+" and it changes everything.";
}

//web interface code

var butClicks = 0;
var savedItems = [];
var premsString = "";
var newPrem = "";
var targetBase = "";

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
	for(var i=1;i<=15;i++) {
        if(butClicks == 0) {
            document.getElementById("p"+i).innerHTML = getPremise().split(" One day, ")[0];
            document.getElementById("p"+i).onclick = chkIt.bind(window,i);
        } else {
            if(document.getElementById("c"+i).checked) {
                if(savedItems.indexOf(document.getElementById("p"+i).innerHTML) == -1) {
                    while(savedItems.length > 14) {
                        savedItems.shift();
                    }
                    savedItems.push(document.getElementById("p"+i).innerHTML);
                }
                document.getElementById("c"+i).checked = false;
                document.getElementById("p"+i).innerHTML = getPremise().split(" One day, ")[0];
            } else {
                document.getElementById("p"+i).innerHTML = getPremise().split(" One day, ")[0];
            }
        }
	}
    if(savedItems.length > 0) {
        updateBranches();
    }
}

function updateBranches() {
    document.getElementById("premsText").innerHTML = "";
    premsString = "";
    for(var i=0;i<savedItems.length;i++) {
        targetBase = savedItems[i];
        for(var n=0;n<5;n++) {
            newPrem = targetBase+" One day, "+getPremise().split(" One day, ")[1];
            premsString += newPrem;
            if(n < 4) {
                premsString += "<br>";
            }
        }
        if(savedItems.length > 1 && i < savedItems.length-1) {
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
        premsString = "";
        document.getElementById("premsText").innerHTML = "";
    }
}