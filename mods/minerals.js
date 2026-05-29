// Intended for use with morechemistry.js, chem.js, and nousersthings.js
dependOn("chem.js", function(){});
dependOn("morechemistry.js", function(){});
dependOn("nousersthings.js", function(){});

// Intermediates
elements.pig_iron = {
    color: ["#7e7e7e","#525252"],
	behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "oxygen": {elem1: "steel", elem2: "carbon_dioxide", tempMin: 400}
    },
    density: 7800,
	tempHigh: 1150,
	forceAutoGen: true
}

// Minerals
elements.hematite = {
    color: ["#c55a4a", "#934033", "#3e1a15", "#281714", "#140f0e"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1380,
    stateHigh: ["magnetite", "oxygen"],
    reactions: {
        "charcoal": {elem1: "pig_iron", elem2: "carbon_dioxide", tempMin: 600},
        "hydrogen": {elem1: "iron", elem2: "steam", tempMin: 800, temp2: 400}
    },
    density: 5260
}

elements.magnetite = {
    color: ["#494949", "#181616", "#080707"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    reactions: {
        "charcoal": { elem1: "pig_iron", elem2: "carbon_dioxide", tempMin: 400},
        "hydrogen": {elem1: "iron", elem2: "steam", tempMin: 600, temp2: 300}
    },
    density: 5170,
	tempHigh: 1600,
	forceAutoGen: true
}

elements.malachite = {
	color: ["#5db987", "#137736", "#0a421e", "#3e985e"],
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
	reactions: {
		"sulfuric_acid": {elem1: "copper_sulfate", elem2:["water", "carbon_dioxide"]},
		"charcoal": {elem1: "copper", elem2: "carbon_dioxide", tempMin: 500}
	},
	tempHigh: 600,
	stateHigh: ["oxidised_copper", "carbon_dioxide"],
	density: 3800
}