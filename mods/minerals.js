// Intended for use with morechemistry.js, chem.js, and nousersthings.js

// Auto generate states.
function generateMolten(tempHigh, elementName) {
    elements["molten_" + elementName] = {
        behavior: behavior.MOLTEN,
        category: "states",
        state: "liquid",
        hidden: true,
        tempLow: tempHigh,
        stateLow: elementName
    }

    elements[elementName].tempHigh = tempHigh;
    elements[elementName].stateHigh = "molten_" + elementName;
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
    }
}

elements.magnetite = {
    color: ["#494949", "#181616", "#080707"],
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    reactions: {
        "charcoal": { elem1: "pig_iron", elem2: "carbon_dioxide", tempMin: 400},
        "hydrogen": {elem1: "iron", elem2: "steam", tempMin: 600, temp2: 300}
    }
}
generateMolten(1600, "magnetite");

// Intermediates
elements.pig_iron = {
    color: ["#7e7e7e","#525252"],
	behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "oxygen": {elem1: "steel", elem2: "carbon_dioxide", tempMin: 400}
    }
}
generateMolten(pig_iron)