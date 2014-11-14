// Eggshaper
// Inspired by Peter F. Hamilton's Void Trilogy - With Love
// 

var genistars = {
	"default",
	"ge-mouse",
	"ge-squirrel",
	"ge-cat",
	"ge-monkey",
	"ge-wolf",
	"ge-eagle",
	"ge-owl",
	"ge-mule",
	"ge-horse",
}

var guild = {
	apprentices = 0, // number of apprentices
	stables = 0,
	dorms = false,
	bed = 0, // 0 - wooden, 1 - ornate, 2 - metal, 3 - crystal
}

var player = {
	name: "Apprentice",
	psych: 0 // psychic level
	psychxp: 0, // Psychic ability leveling
	nextlvl: 1000, // psychic xp needed for next level
	eggs: 0, // number of genistar eggs
	failedshapes: 0, // number of failed eggshapes
	eggsshaped: 0, // number of successful shaped eggs
	gold: 0, // currency quantity
}

function Genistar(type){ // genistar class framework
	this.type = type;
	if (type == "default"){
		this.value = 5000;
	} else if (type == "ge-mouse"){
		this.value = 10;
	} else if (type == "ge-squirrel"){
		this.value = 25;
	} else if (type == "ge-cat"){
		this.value = 50;
	} else if (type == "ge-monkey"){
		this.value = 100;
	} else if (type == "ge-wolf"){
		this.value = 300;
	} else if (type == "ge-eagle"){
		this.value = 500;
	} else if (type == "ge-owl"){
		this.value = 600;
	} else if (type == "ge-mule"){
		this.value = 800;
	} else if (type == "ge-horse"){
		this.value = 1000;
	} else {
		this.value = 100;
	}
}
















