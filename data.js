// Eggshaper
// Inspired by Peter F. Hamilton's Void Trilogy - With Love
// 

var genistars = {
	def: ["default", 1, 5000], // name, owned, vlaue 
	mouse: ["ge-mouse", 0, 10],
	squirrel: ["ge-squirrel", 0, 25],
	cat: ["ge-cat", 0, 50],
	monkey: ["ge-monkey", 0, 100],
	wolf: ["ge-wolf", 0, 300],
	eagle: ["ge-eagle", 0, 500],
	owl: ["ge-owl", 0, 600],
	mule: ["ge-mule", 0, 800],
	horse: ["ge-horse", 0, 100],
}

var guild = {
	apprentices: 0, // number of apprentices
	stables: 0,
	dorms: false,
	bed: 0, // 0 - wooden, 1 - ornate, 2 - metal, 3 - crystal
}

var player = {
	name: "Apprentice",
	psych: 0, // psychic level
	psychxp: 0, // Psychic ability leveling
	nextlvl: 1000, // psychic xp needed for next level
	eggs: 0, // number of genistar eggs
	eggpercent: 0, // 0-100 completed egg
	failedshapes: 0, // number of failed eggshapes
	eggsshaped: 0, // number of successful shaped eggs
	gold: 0, // currency quantity
	laypercent: 0,
}

var firstnames = ["Brent","Tim","Jan","Jim","Dan","Tom","Simon","Joshua","Fred","Edeard","Finitan","Damon","Charles","Jeff","Tristan","Joe","James","Chris"]
var lastnames = ["O'toole","Walward","Forman","Fisher","Fenrir","Kind","Odwalla","Adama","Ensign","Bay","Smith","Woodard","Nelson","Birch","Lander","Walker","Wan","Mann","Flyman","Singer"]

var npcs = {
	merchants: [],
	apprentices: []
}

var settings = {
	autosave: true,
}

var shaping = false;

// system functions

function prettify(input){
    var output = Math.round(input * 100)/100;
	return output;
};

function saveGame(){
	localStorage.setItem("playerSave", JSON.stringify(player));
	localStorage.setItem("genistarSave", JSON.stringify(genistars));
	localStorage.setItem("npcSave", JSON.stringify(npcs));
	localStorage.setItem("settingsSave", JSON.stringify(settings));
	updateLog("Game saved!");
}
function loadGame(){
	var playerSave = JSON.parse(localStorage.getItem("playerSave"));
	var genistarSave = JSON.parse(localStorage.getItem("genistarSave"));
	var npcSave = JSON.parse(localStorage.getItem("npcSave"));
	var settingsSave = JSON.parse(localStorage.getItem("settingsSave"));
	for (var prop in playerSave){
		if (typeof playerSave[prop] !== "undefined") player[prop] = playerSave[prop];
		console.log("Loaded: " + prop);
	};
	for (var prop in genistarSave){
		if (typeof genistarSave[prop] !== "undefined") genistars[prop] = genistarSave[prop];
		console.log("Loaded: " + prop);
	};
	for (var prop in npcSave){
		if (typeof npcSave[prop] !== "undefined") npcs[prop] = npcSave[prop];
		console.log("Loaded: " + prop);
	};
	for (var prop in settingsSave){
		if (typeof settingsSave[prop] !== "undefined") settings[prop] = settingsSave[prop];
		console.log("Loaded: " + prop);
	};
	updateLog("Game loaded!");
}
function deleteSave(){
	var r = confirm("Are you sure! This is irreversable!");
	if (r == true){
		localStorage.clear();
		console.log("SaveGame cleared!");
		window.location.reload();
	}
}

function updateLog(logmessage){
	logmessage = logmessage + "\n";
	document.getElementById("log").innerHTML += logmessage;
	$('#log').scrollTop($('#log')[0].scrollHeight);
}
updateLog("Welcome...");

function readChangelog(){
	var loc = window.location.pathname;
	var dir = loc.substring(0, loc.lastIndexOf('/'));
	var path = "CHANGELOG.md";
	try { // check to see if were going to work
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", path, false);
		rawFile.onreadystatechange = function() {
			changelograw = rawFile.responseText.split("\n");
			for (i = 0; i < changelograw.length; i++){
				document.getElementById("txtchangelog").innerHTML += changelograw[i] + "\n";
			}

			//document.getElementById("changelog").innerHTML += changelograw;
		}
		rawFile.send(null);
	} catch(err){
		document.getElementById("txtchangelog").innerHTML += "We could not load the CHANGELOG... <br />";
		document.getElementById("txtchangelog").innerHTML += "Try checking later...";
	}

}

// classes 
function Merchant(){ // Merchant interested in genistar

	this.firstname = firstnames[Math.floor(Math.random()*firstnames.length)];
	this.lastname = lastnames[Math.floor(Math.random()*lastnames.length)];
	moneyroll = d20.roll(20, false);
	if (moneyroll >= 5 && moneyroll <= 10){
		this.purse = Math.floor(Math.random() * 10000);
		updateLog("A very wealthy merchant named " + this.firstname + " " + this.lastname + " arrives with $" + this.purse);
		//console.log("A very wealthy merchant named " + this.firstname + " " + this.lastname + " arrives with $" + this.purse);
	} else {
		this.purse = Math.floor(Math.random() * 1000);
		updateLog("A merchant named " + this.firstname + " " + this.lastname + " arrives with $" + this.purse);
		//console.log("A merchant named " + this.firstname + " " + this.lastname + " arrives with $" + this.purse);
	}
	this.uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

var d20 = {
	defaultDie: 6,

	verboseOutput: false,
	roll: function(dice, verbose) {
		var amount = 1,
			mod = 0,
			modifiers;
		dice = dice || this.defaultDie;
		verbose = verbose || this.verboseOutput;

		if (typeof dice == 'string') {
			var result = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
			if (result) {
				if (result[1]) {
					amount = parseInt(result[1]);
				}
				if (result[2]) {
					dice = parseInt(result[2]);
				}
				if (result[3]) {
					modifiers = result[3].match(/([+-]\s*\d+)/g);
					for (var i = 0; i < modifiers.length; i++) {
						mod += parseInt(modifiers[i].replace(/\s/g, ""));
					}
				}
			} else {
				parseInt(dice);
			}
		}

		var num = 0,
			result = [];
		for (var i = 0; i < amount; i++) {
			num = Math.floor(Math.random() * dice + 1);
			result.push(num);
		}

		result = result.sort(function(a, b) {
			return a - b;
		});
		if (mod != 0) {
			result.push(mod);
		}

		if (!verbose) {
			num = 0;
			for (var i in result) {
				num += result[i];
			}
			result = num;
		}

		return result;
	}
};

// functions
function createGenistar(typebase){
	genistars[typebase][1]++;
	console.log("Created a " + genistars[typebase][0]);
}

function createMerchant(){
	if (npcs['merchants'].length >= 8){
		updateLog("A merchant stopped, but there was no room...");
	} else {
		temp = new Merchant();
		npcs['merchants'].push(temp)
	}
}

function diceRoll(){
	var randomdice = Math.round(Math.random()*5);
	return randomdice
}

function layEggs(){
	var defaults = genistars['def'][1];
	player['laypercent'] += defaults;
	if (player['laypercent'] >= 100){
		player['eggs']++;
		player['laypercent'] = 0;
	}

}

// Window and button functions

$('#btnchangename').click(function(e){
	player['name'] = prompt("Player name: ").substring(0,16);
	document.getElementById("playerName").innerHTML = player["name"];
});

$('#btnwipesave').click(function(e){
	deleteSave();
});

$('#btnnext').click(function(e){
	if ($('#player').is(':visible')){
		current = "#player";
		next = "#guild";
	} else if ($('#guild').is(':visible')){
		current = "#guild";
		next = "#npcs";
	} else if ($('#npcs').is(':visible')){
		current = "#npcs";
		next = "#player";
	}
	$(current).hide();
	$(next).show();
});
$('#btnlast').click(function(e){
	if ($('#player').is(':visible')){
		current = "#player";
		next = "#npcs";
	} else if ($('#guild').is(':visible')){
		current = "#guild";
		next = "#player";
	} else if ($('#npcs').is(':visible')){
		current = "#npcs";
		next = "#guild";
	}
	$(current).hide();
	$(next).show();
});
$('#btnStables').click(function(e){
	$('#marketarea').hide();
	$('#stablesarea').show();
});
$('#btnMarket').click(function(e){
	$('#marketarea').show();
	$('#stablesarea').hide();
});

$('#autosave').click(function(e){
	autosavevalue = document.getElementById('autosave');
	settings['autosave'] = document.getElementById('autosave').checked;
});

$('#btnoptions').click(function(e){ // toggle the divs
	e.preventDefault();
	$('#changelog').hide();

	if ($('#resetoptions').is(':visible')){
		$('#playarea').show();
		$('#resetoptions').hide();
		$('#playeroptions').hide();		
	} else {
		$('#playarea').hide();
		$('#resetoptions').show();
		$('#playeroptions').show();
	}
});

$('#btnchangelog').click(function(e){
	$('#resetoptions').hide();
	$('#playeroptions').hide();

	if ($("#changelog").is(':visible')){
		$('#playarea').show();
		$('#changelog').hide();
	} else {
		$('#playarea').hide();
		$('#changelog').show();		
	}
	// Check for the various File API support.
});

$('#btnsavegame').click(function(e){
	saveGame();
})
$('#btnloadgame').click(function(e){
	loadGame();
})

function shapeEgg(autoclicked){
	//player['eggsshaped']++;
	if (player['eggs'] >= 1){
		if (autoclicked == true){
			player['eggpercent'] += .5;
		} else {
			player['eggpercent'] += 1;
		}
		if (player['eggpercent'] >= 100){
			player['eggpercent'] = 0;
			player['eggs']--;
			createGenistar('mouse'); // temporary 
			player['eggsshaped']++;
			
		}

	}
}

$('#btnshape').click(function(e){
	shapeEgg();
});

Element.prototype.remove = function(){
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for (var i = 0, len = this.length; i < len; i++){
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
}
function addButton(gentype, merchant, value){
	var element = document.createElement("BUTTON");
	var parentelement = document.createElement("DIV");
	element.setAttribute("class", "btn");
	element.setAttribute("id", "btnSell" + gentype);
	element.name = gentype;

	var t = document.createTextNode("Sell " + genistars[gentype][0] + " to " + npcs['merchants'][merchant]['firstname'] + " " + npcs['merchants'][merchant]['lastname']);
	element.appendChild(t);
	parentelement.id = 'auctionobject';
	parentelement.appendChild(element);

	var foo = document.getElementById("marketarea");
	foo.appendChild(parentelement);

	element.uid = npcs['merchants'][merchant]['uid'];
	element.gentype = gentype;
	element.sellval = value;
	par = parentelement;

	element.onclick = function() {
		var sold = false
		for (var index in npcs['merchants']){
			if (npcs['merchants'][index]['uid'] == this.uid){
				if (genistars[gentype][1] > 0){
					updateLog("You sold " + npcs['merchants'][index]['firstname'] + " " + npcs['merchants'][index]['lastname'] + " a " + genistars[this.gentype][0] + " for " + this.sellval);
					npcs['merchants'][index]['purse'] -= this.sellval;
					sold = !this.sold;
					console.log("Setting sold to " + sold);
				} else {
					updateLog("You ran out of genistars since this offer was made!");
					sold = !this.sold;
				}
			}
		}
		if (sold == false){
			updateLog("It seems this offer has expired!");
		}
		//var parent = this.parentElement;
		//parent.parentElement.removeChild(parent);
		document.getElementById("auctionobject").remove();
	}

	recycleButton(this, 1000);
}

function recycleButton(object, time){
	timer = setTimeout(function(){
		document.getElementById("auctionobject").remove();
	}, time);
}

function updateMerchants(){
	document.getElementById("merchants").innerHTML = "";
	for (var index in npcs['merchants']){
		npcs['merchants'][index]['purse']--;
		if (npcs['merchants'][index]['purse'] <= 0){
			updateLog(npcs['merchants'][index]['firstname'] + " " + npcs['merchants'][index]['lastname'] + " ran out of money and left.");
			npcs['merchants'].splice(index, 1);
		}
		document.getElementById("merchants").innerHTML += npcs['merchants'][index]['firstname'] + " " + npcs['merchants'][index]['lastname'] + " ($" + npcs['merchants'][index]['purse'] + ")<br />";

		var result;
		var inc = 0;
		for (var prop in genistars){
			if (Math.random() < 1/++inc) {
				if (genistars[prop][1] > 0){
					result = prop;	
				}
				
			}
		}
		if (result != null){
			//addButton(result, index, 100);
		}
	}

}

function merchantOffers(){
	for (var index in npcs['merchants']){
		var result;
		var inc = 0;
		for (var prop in genistars){
			if (Math.random() < 1/++inc) {
				if (genistars[prop][1] > 0){
					result = prop;	
				}
				
			}
		}
		if (result != null){
			//addButton(result, index, 100);
		}
	}

}

function updateStats(){
	document.getElementById("eggnumber").style.width = prettify(player['eggpercent']) + "%";
	document.getElementById("eggpercent").innerHTML = prettify(player['eggpercent']) + "%";
	document.getElementById('playerEggs').innerHTML = prettify(player['eggs']);

	document.getElementById("laynumber").style.width = prettify(player['laypercent']) + "%";
	document.getElementById("laypercent").innerHTML = prettify(player['laypercent']) + "%";
}

function onLoad(){
	// big time onload stuff
	loadGame();

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		readChangelog()
	} else {
	  alert('The File APIs are not fully supported by your browser.');
	}

	$('#resetoptions').hide(); // disable the options div when we load
	$('#playeroptions').hide();
	$('#changelog').hide();
	$('#guild').hide();
	$('#npcs').hide();
	$('#marketarea').hide();
	
	window.setInterval(function() {
		// Update screen vars
		document.getElementById("playerName").innerHTML = player["name"];
		document.title = "Eggshaper - " + player['name'];
		document.getElementById('autosave').checked = settings['autosave'];
		document.getElementById('eggshapes').innerHTML = player['eggsshaped'];
		updateMerchants();
		updateStats();

		if (document.getElementById('autoclick').checked == true){
			shaping = true;
			shapeEgg(true);
		} else {
			shaping = false;
		}

		layEggs();
	}, 100);

	window.setInterval(function(){
		merchantOffers();
	}, 10000)

	window.setInterval(function() {
		// autosave
		if (settings['autosave'] == true){
			saveGame();
		}
	}, 120000);

	window.setInterval(function() {
		roll = d20.roll(20, false);
		//console.log(roll);
		if (roll <= 3){
			merchroll = d20.roll('2d6');
			if (merchroll <= 10){
				//console.log("Merchants come...")
				createMerchant();
			} else {
				//console.log("Merchants go...")
				if (npcs['merchants'].length >= 1){
					randommerchant = Math.floor(Math.random() * npcs['merchants'].length);
					chosenmerchant = npcs['merchants'][randommerchant]['firstname']
					updateLog(chosenmerchant + " leaves...");
					npcs['merchants'].splice(randommerchant, 1);
				}
			}
			//console.log("Merchants come and go.");
		//} else if (roll >= 4 && roll <= 5){ // ignore 5
		} else if (roll == 4){
			console.log("Something annoying happens");
		} else if (roll >= 5 && roll <= 7){ //
			console.log("Something benificial happens");
		} else if (roll >= 8 && roll <= 20){
			console.log("Nothing happens...");
		}

	}, 2000);
}

$( document ).ready(function() {
	// Onload!
	onLoad();
	console.log("Ready!");
});







