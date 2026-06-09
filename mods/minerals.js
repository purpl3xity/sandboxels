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
        "oxygen": {elem1: "steel", elem2: "carbon_dioxide", tempMin: 400, chance:0.75}
    },
    density: 7800,
	tempHigh: 1150,
	forceAutoGen: true
}

// Chemical intermediates
elements.sodium.reactions["alcohol"] = {elem1:"sodium_ethoxide", elem2:"hydrogen", chance:0.5};

elements.sodium_ethoxide = {
	color: "#ebebeb",
	behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 300,
	stateHigh: ["ethylene", "sodium_hydroxide", "charcoal"],
    reactions: {
        "carbon_disulfide": {elem1: "sodium_ethyl_xanthate",elem2:null,chance:0.2},
		"water": {elem1: "sodium_hydroxide", elem2: "ethanol", temp1: 20, temp2: 20}
    },
    density: 300
}

elements.sulfur.reactions["methane"] = {elem1:"carbon_disulfide", elem2:"hydrogen"};

elements.carbon_disulfide = {
	color: "#f6fab9",
	behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 46,
    density: 1226,
	burn: 80,
	burnTime: 10,
	burnInto: "sulfur_dioxide"
}

elements.sodium_ethyl_xanthate = {
	color: "#f3ecc2",
	behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    tempHigh: 182,
	stateHigh: ["carbon_disulphide", "carbon_dioxide"],
    reactions: {
		"water": {elem1: null, elem2: "flotation_solution"}
    },
    density: 1263
} // I'm tired, boss

elements.flotation_solution = {
	color: "#f1ccf1",
	behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    tempHigh: 100,
	stateHigh: ["sodium_ethyl_xanthate", "steam"],
    density: 1012
}

// Minerals

// Oxide ores

elements.hematite = {
    color: ["#c55a4a", "#934033", "#3e1a15", "#281714", "#140f0e"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tempHigh: 1380,
    stateHigh: ["magnetite", "oxygen"],
    reactions: {
        "charcoal": {elem1: "pig_iron", elem2: "carbon_dioxide", tempMin: 600, chance:0.25},
        "hydrogen": {elem1: "iron", elem2: "steam", tempMin: 800, chance: 0.1}
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
        "hydrogen": {elem1: "iron", elem2: "steam", tempMin: 600}
    },
    density: 5170,
	tempHigh: 1600,
	forceAutoGen: true
}

elements.cassiterite = {
	color: ["#e0e3e4", "#6b6b6b", "#4e4e4e"],
	behaviour: behaviors.POWDER,
	category: "land",
	state: "solid",
	reactions: {
		"charcoal": {elem1: "tin", elem2: "carbon_dioxide", tempMin: 600, chance: 0.25}
	},
	tempHigh: 1625,
	density: 7150
}

// Carbonate ores

elements.malachite = {
	color: ["#5db987", "#137736", "#0a421e", "#3e985e"],
	behavior: behaviors.POWDER,
	category: "land",
	state: "solid",
	reactions: {
		"sulfuric_acid": {elem1: "copper_sulfate", elem2:["water", "carbon_dioxide"], chance: 0.5},
		"charcoal": {elem1: "copper", elem2: "carbon_dioxide", tempMin: 500, chance: 0.25}
	},
	tempHigh: 600,
	stateHigh: ["oxidised_copper", "carbon_dioxide"],
	density: 3800
}

// Sulfide ores

elements.sphalerite = {
    color: ["#2f2f2f", "#1a1a1a", "#4a4a4a"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 4000,
    tempHigh: 1180,
    reactions: {
        "charcoal": {elem1: "zinc", elem2: "sulfur_dioxide", tempMin: 700, chance: 0.25}
    }
}

elements.galena = {
    color: ["#3b3b3b", "#1c1c1c", "#6a6a6a"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 7500,
    tempHigh: 1110,
    reactions: {
        "charcoal": {elem1: "lead", elem2: "sulfur_dioxide", tempMin: 500, chance: 0.25}
    }
}

// Other ores

elements.scheelite = {
	color: ["#3b2a1f", "#2a211c", "#4a3326", "#1f1b18", "#5a3b2a"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    density: 6000
} // I'm tired, boss

// Rocks

function applyPorosity(pixel) {
    if (Math.random() < elements[pixel.element].porosity) {
        deletePixel(pixel.x, pixel.y);
    }
}

function makePorous(element) {
    elements[element].onPlace = applyPorosity(pixel);
}

function meltsToMagma(element) {
    elements[element].tempHigh = 1200;
    elements[element].stateHigh = elements.magma;
    // I'm so lazy
}

// Igneous //

elements.granite = {
    color: ["#685c5d", "#ac8084", "#8f7374",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2750
}
//meltsToMagma("granite");

elements.andesite = {
	color: ["#a1a1a1", "#858585", "#4d4f50",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2500,
	porosity: 0.02
}
makePorous("andesite");
meltsToMagma("andesite");

elements.dacite = {
	color: ["#adadad", "#8f948c", "#afa39e",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2550,
	porosity: 0.015
}
makePorous("dacite");
meltsToMagma("dacite");

// Sedimentary //

elements.chert = {
    color: ["#a73f1c", "#bd4720", "#dd3933",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2700,
    porosity: 0.01 // This is the chacne it'll have an empty pixel
}
makePorous("chert");
meltsToMagma("chert");

elements.shale = {
    color: ["#959ea1", "#545763", "#84848b",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2200,
    porosity: 0.2
}

// Metamorphic //

elements.marble = {
    color: ["#e6e3e2", "#c0bcbd", "#928e8e",],
    behavior: behaviors.SUPPORTPOWDER,
    category: "land",
    state: "solid",
    density: 2800
}
meltsToMagma("marble");