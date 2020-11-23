let color = ["r", "g", "b", "y", "a"];
let mark = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "<>", "_2", "+4", "_"];

let deck = [];

let computerCards = [];
let gamerCards = [];
let isColorChange = false;
let currentCard = "";

function createDeck() {
	for (let c = 0; c < color.length - 1; c++) {
		for (let i = 0; i < 10; i++) {
			deck.push(mark[i] + " " + color[c]);
		}
		for (let i = 1; i < 10; i++) {
			deck.push(mark[i] + " " + color[c]);
		}
		for (let i = 0; i < 2; i++) {
			deck.push("! " + color[c]);
			deck.push("<> " + color[c]);
			deck.push("+2 " + color[c]);
		}
		deck.push("_ a");
		deck.push("+4 a");
	}
}
createDeck();


function compareRandom(a, b) {
	return Math.random() - 0.5;
}

function giveCard() {
	deck.sort(compareRandom);
	for (let i = 0; i < 7; i++) {
		computerCards.push(deck.pop());
		gamerCards.push(deck.pop());
	}
	currentCard = deck.pop();
	deck.unshift(currentCard);
	if (currentCard.split(" ")[1] == "a") {
		currentCard = currentCard.split(" ")[0] + " r";
	}
}
giveCard();



window.onload = function () {
	let computer = document.getElementById("computer");
	for (let i = 0; i < computerCards.length; i++) {
		let img = document.createElement("img");
		img.src = "img/outer-side.png";
		if (computerCards.length > 7) {
			img.style.width = 100 / computerCards.length + "%";
		} else {
			img.style.width = "10%";
		}
		computer.appendChild(img);
	}



	let gamer = document.getElementById("gamer");
	for (let i = 0; i < gamerCards.length; i++) {
		let img = document.createElement("img");
		img.src = getImages(gamerCards[i]);
		img.id = gamerCards[i];
		if (gamerCards.length > 7) {
			img.style.width = 100 / gamerCards.length + "%";
		} else {
			img.style.width = "10%";
		}
		gamer.appendChild(img);
	}

	let d = document.getElementById("deck");
	d.innerHTML = '<img src="img/outer-side-2.png"/>';

	let c = document.getElementById("current");
	c.innerHTML = '<img src="' + getImages(currentCard) + '"/>';
}

function getImages(card) {
	let images = "img/";

	switch (card.split(" ")[1]) {
		case "r":
			images += "red/";
			break;
		case "b":
			images += "blue/";
			break;
		case "g":
			images += "green/";
			break;
		case "y":
			images += "yellow/";
			break;
	}

	switch (card.split(" ")[0]) {
		case "0":
			images += "zero.png";
			break;
		case "1":
			images += "one.png";
			break;
		case "2":
			images += "two.png";
			break;
		case "3":
			images += "three.png";
			break;
		case "4":
			images += "four.png";
			break;
		case "5":
			images += "five.png";
			break;
		case "6":
			images += "six.png";
			break;
		case "7":
			images += "seven.png";
			break;
		case "8":
			images += "eight.png";
			break;
		case "9":
			images += "nine.png";
			break;
		case "+2":
			images += "add-two.png";
			break;
		case "!":
			images += "stop.png";
			break;
		case "<>":
			images += "reverse.png";
			break;
		case "_":
			images += "exchange.png";
			break;
		case "+4":
			images += "exchange-one.png";
			break;
	}

	if (card.split(" ")[1] == "a" || card.split(" ")[0] == "+4" || card.split(" ")[0] == "_") {
		switch (card.split(" ")[1]) {
			case "_":
				images = "resource/exchange.png";
				break;
			case "+4":
				images = "resource/exchange-one.png";
				break;
		}
	}
	return images;
}

function newGame() {
	deck = [];
	computerCards = [];
	gamerCards = [];
	let main = document.getElementById("main");
	main.style.display = "none";
	createDeck();
	giveCard();
	updateDesk();
}


function updateDesk() {

	let computer = document.getElementById("computer");

	while (computer.firstChild) {
		computer.removeChild(computer.firstChild);
	}
	for (let i = 0; i < computerCards.length; i++) {
		let img = document.createElement("img");
		img.src = "img/outer-side.png";
		if (computerCards.length > 7) {
			img.style.width = 100 / computerCards.length + "%";
		} else {
			img.style.width = "10%";
		}
		computer.appendChild(img);
	}



	let gamer = document.getElementById("gamer");
	while (gamer.firstChild) {
		gamer.removeChild(gamer.firstChild);
	}
	for (let i = 0; i < gamerCards.length; i++) {
		let img = document.createElement("img");
		img.src = getImages(gamerCards[i]);
		img.id = gamerCards[i];
		if (gamerCards.length > 7) {
			img.style.width = 100 / gamerCards.length + "%";
		} else {
			img.style.width = "10%";
		}
		gamer.appendChild(img);
	}


	let c = document.getElementById("current");
	while (c.firstChild) {
		c.removeChild(c.firstChild);
	}
	c.innerHTML = '<img src="' + getImages(currentCard) + '"/>';

}

function isWin() {
	if (computerCards.length == 0) {
		return true;
	} else {
		if (gamerCards.length == 0) {
			return true;
		}
	}
	return false;

}

let card = "";

function getId(e) {
	e = e || window.event;
	var el = e.target || e.srcElement;
	if (el.id != "ng") {
		if (el.id != "" && el.id != "deck" && el.id != "current") {
			card = el.id;
		}
		moveByGamer();
	} else {
		newGame();
	}
}


function isCorrectCard(correctCerd) {
	if (correctCerd.split(" ")[0] == currentCard.split(" ")[0] || correctCerd.split(" ")[1] == currentCard.split(" ")[1] || correctCerd.split(" ")[1] == "a") {
		return true;
	} else {
		return false;
	}
}

function oneMoreCard(player) {
	let c = deck.pop();
	player.push(c);
}

function gamerWin() {
	let main = document.getElementById("main");
	main.style.display = "block";

	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
	main.innerHTML = '<img id="ng" onclick="getId()" src="img/win.png"/>';
}

function gamerLose() {
	let main = document.getElementById("main");
	main.style.display = "block";

	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
	main.innerHTML = '<img id="ng" onclick="getId()" src="img/lose.png"/>';
}

function gameOver() {
	if (computerCards.length == 0) {
		gamerLose();
	} else {
		gamerWin();
	}
}

function findCard() {
	let c = "";
	for (let i = 0; i < computerCards.length; i++) {
		if (isCorrectCard(computerCards[i])) {
			c = computerCards[i];
		}
	}
	return c;
}

function moveByComputer() {

	let c = findCard();
	if (c != "") {
		currentCard = c;
		let i = computerCards.indexOf(c);
		computerCards.splice(i, 1);
		deck.unshift(currentCard);
		if (!isWin()) {
			if (currentCard.split(" ")[0] == "+4" || currentCard.split(" ")[0] == "_") {
				let n = Math.floor(Math.random() * 4);
				currentCard = currentCard.split(" ")[0] + " " + color[n];
			}

			switch (c.split(" ")[0]) {
				case "<>":
					moveByComputer();
					break;
				case "!":
					moveByComputer();
					break;
				case "+2":
					oneMoreCard(gamerCards);
					oneMoreCard(gamerCards);
					moveByComputer();
					break;
				case "+4":
					oneMoreCard(gamerCards);
					oneMoreCard(gamerCards);
					oneMoreCard(gamerCards);
					oneMoreCard(gamerCards);
					moveByComputer();
					break;
				default:
					break;
			}
			updateDesk();
		} else {
			updateDesk();
			gameOver();
		}
	} else {
		oneMoreCard(computerCards);
		c = findCard();
		if (c != "") {
			currentCard = c;
			let i = computerCards.indexOf(c);
			computerCards.splice(i, 1);
			deck.unshift(currentCard);
			if (!isWin()) {
				if (currentCard.split(" ")[0] == "+4" || currentCard.split(" ")[0] == "_") {
					let n = Math.floor(Math.random() * 4);
					currentCard = currentCard.split(" ")[0] + " " + color[n];
				}

				switch (currentCard.split(" ")[0]) {
					case "<>":
						moveByComputer();
						break;
					case "!":
						moveByComputer();
						break;
					case "+2":
						oneMoreCard(gamerCards);
						oneMoreCard(gamerCards);
						moveByComputer();
						break;
					case "+4":
						oneMoreCard(gamerCards);
						oneMoreCard(gamerCards);
						oneMoreCard(gamerCards);
						oneMoreCard(gamerCards);
						moveByComputer();
						break;
					default:
						break;
				}
				updateDesk();
			} else {
				updateDesk();
				gameOver();
			}
		}
	}
}

function setRed() {
	if (isColorChange) {
		let m = currentCard.split(" ")[0];
		currentCard = m + " r";
		isColorChange = false;
		updateDesk();
		switch (currentCard.split(" ")[0]) {
			case "<>":
				break;
			case "!":
				break;
			case "+2":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			case "+4":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			default:
				moveByComputer();
		}
		updateDesk();
	}
}

function setBlue() {
	if (isColorChange) {
		let m = currentCard.split(" ")[0];
		currentCard = m + " b";
		isColorChange = false;
		updateDesk();
		switch (currentCard.split(" ")[0]) {
			case "<>":
				break;
			case "!":
				break;
			case "+2":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			case "+4":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			default:
				moveByComputer();
		}
		updateDesk();
	}
}

function setGreen() {
	if (isColorChange) {
		let m = currentCard.split(" ")[0];
		currentCard = m + " g";
		isColorChange = false;
		updateDesk();
		switch (currentCard.split(" ")[0]) {
			case "<>":
				break;
			case "!":
				break;
			case "+2":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			case "+4":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			default:
				moveByComputer();
		}
		updateDesk();
	}
}

function setYellow() {
	if (isColorChange) {
		let m = currentCard.split(" ")[0];
		currentCard = m + " y";
		isColorChange = false;
		updateDesk();
		switch (currentCard.split(" ")[0]) {
			case "<>":
				break;
			case "!":
				break;
			case "+2":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
			case "+4":
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				oneMoreCard(computerCards);
				break;
		}
		updateDesk();
	}
}

function moveByGamer() {

	if (!isWin() && !isColorChange) {

		if (isCorrectCard(card)) {
			currentCard = card;
			let i = gamerCards.indexOf(card);
			gamerCards.splice(i, 1);
			deck.unshift(currentCard);
			if (isWin()) {
				updateDesk();
				gameOver();
			} else {
				if (currentCard.split(" ")[1] != "a") {
					switch (currentCard.split(" ")[0]) {
						case "<>":
							break;
						case "!":
							break;
						case "+2":
							oneMoreCard(computerCards);
							oneMoreCard(computerCards);
							break;
						case "+4":
							oneMoreCard(computerCards);
							oneMoreCard(computerCards);
							oneMoreCard(computerCards);
							oneMoreCard(computerCards);
							break;
						default:
							moveByComputer();
					}
					updateDesk();
				} else {
					isColorChange = true;
				}
				updateDesk();

			}
		}
	} else {

	}
}

function getNextCard() {
	oneMoreCard(gamerCards);
	updateDesk();
	let c = gamerCards[gamerCards.length - 1];

	if (isCorrectCard(c)) {
		card = c;
		moveByGamer();
	} else {
		moveByComputer();
	}
}