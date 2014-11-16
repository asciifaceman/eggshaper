// Eggshaper
// Inspired by Peter F. Hamilton's Void Trilogy - With Love
// 

var genistars = {
	def: ["default", 0, 5000], // name, owned, vlaue 
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
	failedshapes: 0, // number of failed eggshapes
	eggsshaped: 0, // number of successful shaped eggs
	gold: 0, // currency quantity
}

var firstnames = ["Brent","Tim","Jan","Jim","Dan","Tom","Simon","Joshua","Fred","Edeard","Finitan","Damon","Charles","Jeff","Tristan","Joe","James","Chris"]
var lastnames = ["O'toole","Walward","Forman","Fisher","Fenrir","Kind","Odwalla","Adama","Ensign","Bay","Smith","Woodard","Nelson","Birch","Lander","Walker","Wan","Mann","Flyman","Singer"]

var npcs = {
	merchants: [],
	apprentices: []
}

// system functions
function updateLog(logmessage){
	logmessage = logmessage + "\n";
	document.getElementById("log").innerHTML += logmessage;
}
updateLog("Welcome...");

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
	temp = new Merchant();
	npcs['merchants'].push(temp)
}

function diceRoll(){
	var randomdice = Math.round(Math.random()*5);
	return randomdice
}

// Window functions

$('#resetoptions').toggle(); // disable the options div when we load
$('#playeroptions').toggle();

$('#btnoptions').click(function(e){ // toggle the divs
	e.preventDefault();
	$('#playarea').toggle();
	$('#resetoptions').toggle();
	$('#playeroptions').toggle();
})

// Timers

window.setInterval(function() {
	roll = d20.roll(20, false);
	//console.log(roll);
	if (roll <= 5){
		merchroll = d20.roll('2d6');
		if (merchroll <= 6){
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
	} else if (roll >= 6 && roll <= 8){
		console.log("Something annoying happens");
	} else if (roll >= 9 && roll <= 11){ //
		console.log("Something benificial happens");
	} else if (roll >= 12 && roll <= 20){
		console.log("Nothing happens...");
	}


}, 1000)




















