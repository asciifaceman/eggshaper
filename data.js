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
	bed = 0, // 0 - wooden, 1 - metal, 2 - crystal
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

