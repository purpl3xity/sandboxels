// v0.0.0 indev

let chemicalElements = {};
let chemicalCompounds = {};

chemicalElements.sodium = {
	symbol: "Na",
    name: "sodium",
    oxidationStates: [1],
    reactivity: 0.7
}

chemicalElements.chlorine = {
	symbol: "Cl",
    name: "chlorine",
    oxidationStates: [-1],
    reactivity: 0.8
}

/*
	An ion is
	{
		name: "sodium",
		charge: 1
	}
*/

function generateIonPixels() {
    Object.values(chemicalElements).forEach(element => {
        element.oxidationStates.forEach(ion => {
            // I have no fucking idea how colours work, so i'll use a map for -8 to 8
			let positive = ["#ff8888", "#ff7777", "#ff6666", "#ff5555", "#ff4444", "#ff3333", "#ff2222", "#ff1111"];
			let negative = ["#8888ff", "#7777ff", "#6666ff", "#5555ff", "#4444ff", "#3333ff", "#2222ff", "#1111ff"];

			let hex = ion > 0 ? positive[ion - 1] : negative[Math.abs(ion) - 1];

			elements[element.name + "_" + ion.toString()] = {
				color: hex,
				behavior: behaviors.LIQUID,
				category: "liquids",
				density: 1000, // Until I find a better way to suspend pixels in water
				state: "gas",
				ion: {
					name: element.name,
					charge: ion
				},
				tick: function(pixel) {
					let directions = [
						{ dx: 0, dy: 1 },
						{ dx: 0, dy: -1 },
						{ dx: 1, dy: 0 },
						{ dx: -1, dy: 0 }
					]

					for (let dir of directions) {
						let neighbor = getPixel(pixel.x + dir.dx, pixel.y + dir.dy);
						if (!neighbor || !neighbor.ion) continue;

						if (pixel.ion.charge * neighbor.ion.charge >= 0) continue;

						let larger, smaller;
						if (Math.abs(pixel.ion.charge) >= Math.abs(neighbor.ion.charge)) {
							larger = pixel;
							smaller = neighbor;
						} else {
							larger = neighbor;
							smaller = pixel;
						}

						let compoundKey = larger.ion.name + "1_" + smaller.ion.name + "1";

						tryDelete(neighbor.x, neighbor.y);
						changePixel(pixel, compoundKey);
						break;
					}
				}
			}
        });
    });
}

function generateChemicalCompounds() {
    Object.values(chemicalCompounds).forEach(compound => {
		let formula = chemicalElements[compound.atoms[0][0]].symbol + chemicalElements[compound.atoms[1][0]].symbol + compound.atoms[1][1];

        elements[formula] = {
				color: "#cccccc",
				behavior: behaviors.POWDER,
				category: "powder",
				density: 1000, // I'm gonna have to model crystals, find melting points and boiling points. How fun yipee
				state: "solid"
			}
    });
}

// Doesn't this have a factorial growth?
// I don't know how to make compounds with more than 2 atoms (e.g. (Mg,Fe)SiO₄, HNO₃) as of yet. Probably will need a secondary system for that or recursion
function generateCompounds() {
	Object.values(chemicalElements).forEach(element => {
		element.oxidationStates.forEach(ion => {
			Object.values(chemicalElements).forEach(reactant => {
				if (element == reactant) continue;

				reactant.oxidationStates.forEach(reactantIon => {
					// Actually, I think it's much worse than factorial.
					// Not to mention we will need intermediates, so like Na₂O also has NaO⁺ as a precursor

					if ((reactantIon > 0 && ion > 0) || (reactantIon < 0 && ion < 0)) continue; // Can't have same charge molecules!!

					var largest, smallest;
					if (Math.abs(ion) > Math.abs(reactantIon)) {
						largest = {state: ion, atom: element};
						smallest = {state: reactantIon, atom: reactant};
					} else {
						largest = {state: reactantIon, atom: reactant};
						smallest = {state: ion, atom: element};
					}

					const maxAtoms = Math.ceil(Math.abs(largest.state) / Math.abs(smallest.state));
					for (let i = 1; i < maxAtoms + 1; i++) {
						chemicalCompounds[largest.atom.name + "1" + "_" + smallest.atom.name + i] = {
							charge: largest.state + (smallest.state * i),
							atoms: [
								[largest.atom.name, 1],
								[smallest.atom.name, i]
							] // Order it smallest to largest
						}
					}
				});
			});
		});
	});
}

generateCompounds();
generateChemicalCompounds();
generateIonPixels();