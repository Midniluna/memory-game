const gameContainer = document.getElementById("game");

const COLORS = [
	"red",
	"blue",
	"green",
	"orange",
	"purple",
	"red",
	"blue",
	"green",
	"orange",
	"purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement("div");
		newDiv.classList.add(color);
		newDiv.addEventListener("click", handleCardClick);
		gameContainer.append(newDiv);
	}
}

function checkCards() {
	// check if there's two cards flipped
	if (document.querySelectorAll(".flipped").length === 2) {
		// IF flipped cards match, remove flipped and add completed
		console.log("you've reached 2!");
		if (
			`${document.querySelectorAll(".flipped")[0].classList}` ===
			`${document.querySelectorAll(".flipped")[1].classList}`
		) {
			console.log("matched!");
			let flipped = document.getElementsByClassName("flipped");
			flipped[1].classList.add("completed");
			flipped[0].classList.add("completed");
			flipped[1].classList.remove("flipped");
			flipped[0].classList.remove("flipped");
			console.log("completed");
		} else {
			setTimeout(function funcInter() {
				for (i = 0; i < 2; i++) {
					let flipped = document.getElementsByClassName("flipped")[0];
					flipped.style.backgroundColor = "white";
					flipped.classList.remove("flipped");
					console.log("no matches");
				}
			}, 1200);
		}
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	if (event.target.classList.contains("completed")) {
		return;
	}
	if (document.querySelectorAll(".flipped").length === 2) {
		return;
	}
	// Flip a card, give it the flipped class
	event.target.classList.toggle("flipped");

	let bgColor = event.target.classList[0];
	// Change the background color to match the color class of the card
	if (event.target.style.backgroundColor != bgColor) {
		event.target.style.backgroundColor = bgColor;
	} else {
		event.target.style.backgroundColor = "white";
	}
	console.log("you just clicked", event.target);
	checkCards();
}

// when the DOM loads
createDivsForColors(shuffledColors);
