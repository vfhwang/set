var deck = new Array();
var cardcolor = ["red", "green", "purple"];
var cardnum = ["one", "two", "three"];
var cardsymbol = ["diamond", "squiggle", "oval"];
var cardfill = ["solid", "stripe", "stroke"];
var onCardNumber = 0;
var wins = 0;


function getDeck() {
	var deck = new Array();
	for (var w = 0; w < cardcolor.length; w++) {
		for (var x = 0; x < cardnum.length; x++) {
			for (var y = 0; y < cardsymbol.length; y++) {
				for (var z = 0; z < cardfill.length; z++) {
					var card = {
						Cardcolor: cardcolor[w],
						Cardnum: cardnum[x],
						Cardsymbol: cardsymbol[y],
						Cardfill: cardfill[z]
					};
					deck.push(card);
				}
			}
		}
	}
	return deck;
}

function shuffle() {
	for (var i = 0; i < 1000; i++) {
		var location1 = Math.floor((Math.random() * deck.length))
		var location2 = Math.floor((Math.random() * deck.length))
		var tmp = deck[location1];
		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}
function dealCard(i){
var card = document.createElement("div");
var cardinner = document.createElement("div");
var cardcolor = document.createElement("div");
var cardnum = document.createElement("div");
var cardsymbol = document.createElement("div");
var cardfill = document.createElement("div");
card.appendChild(cardinner);
card.className = "card";
cardinner.classList.add("cardinner");
cardinner.classList.add(deck[i].Cardcolor);
cardinner.classList.add(deck[i].Cardnum);
cardinner.classList.add(deck[i].Cardsymbol);
cardinner.classList.add(deck[i].Cardfill);
document.getElementById("deck").appendChild(card);
onCardNumber++
};

function addThreeCards(){
	for (var i = 0; i < 3; i++) {
		dealCard(onCardNumber)
	}
}

function replaceCards(clickedCard){
replaceCard(clickedCard);
}

function replaceCard(card){


	var element = card;
	while (element.firstChild) {
	  element.removeChild(element.firstChild);
	}

	var cardinner = document.createElement("div");

	card.appendChild(cardinner);

	cardinner.className = "cardinner ";
	cardinner.className += deck[onCardNumber].Cardcolor;
	cardinner.className += " ";
	cardinner.className += deck[onCardNumber].Cardnum;
	cardinner.className += " ";
	cardinner.className += deck[onCardNumber].Cardsymbol;
	cardinner.className += " ";
	cardinner.className += deck[onCardNumber].Cardfill;
	document.getElementById("deck").appendChild(card);


	onCardNumber = [Number(onCardNumber)+1]
	console.log(onCardNumber)
};

function renderDeck() {
	for (var i = 0; i < 12; i++) {
		dealCard(i)
	}
}

function load() {
	deck = getDeck();
	shuffle();
	renderDeck();
	clicktrack();

}
var compareClicks = [];
var clickedCardz = [];

function numberChecker(number) {
	if (compareClicks[0][number] === compareClicks[1][number] && compareClicks[0][number] === compareClicks[2][number] || compareClicks[0][number] !== compareClicks[1][number] && compareClicks[0][number] !== compareClicks[2][number] && compareClicks[1][number] !== compareClicks[2][number]) {
		return true
	} else {
		return false
	}
}

function checkCorrect() {
	var checkingAllCombos = [];
	for (var i = 1; i <= 4; i++) {
		checkingAllCombos.push(numberChecker(i));
	};
	var isAllTrue = true;
	for (var k = 0; k < checkingAllCombos.length; k++) {
		if (checkingAllCombos[k] == false) {
			isAllTrue = false;
		}
	}
	checkingAllCombos = [];
	return isAllTrue;
};
//
// function checkCorrect(){
//   (compareClicks[0][1] === compareClicks[1][1] && compareClicks[0][1] === compareClicks[2][1]
//   || compareClicks[0][1] !== compareClicks[1][1] && compareClicks[0][1] !== compareClicks[2][1] && compareClicks[1][1] !== compareClicks[2][1])
//   &&
//   (compareClicks[0][2] === compareClicks[1][2] && compareClicks[0][2] === compareClicks[2][2]
//   || compareClicks[0][2] !== compareClicks[1][2] && compareClicks[0][2] !== compareClicks[2][2] && compareClicks[1][2] !== compareClicks[2][2])
//   &&
//   (compareClicks[0][3] === compareClicks[1][3] && compareClicks[0][3] === compareClicks[2][3]
//   || compareClicks[0][3] !== compareClicks[1][3] && compareClicks[0][3] !== compareClicks[2][3] && compareClicks[1][3] !== compareClicks[2][3])
//   &&
//   (compareClicks[0][4] === compareClicks[1][4] && compareClicks[0][4] === compareClicks[2][4]
//   || compareClicks[0][4] !== compareClicks[1][4] && compareClicks[0][4] !== compareClicks[2][4] && compareClicks[1][4] !== compareClicks[2][4])
//
// };
window.onload = load;

function clicktrack() {
	function hasSomeParentTheClass(element, classname) {
		if (element.className.split(' ').indexOf(classname) >= 0) return true;
		return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
	}
	window.onclick = function(e) {
			var classListForComparedClicks = e.srcElement.className.split(/\s+/);
			var element = e.srcElement;
			if (element.classList.contains("cardinner")) {
				e.srcElement.parentNode.classList.add('clicked');
				compareClicks.push(classListForComparedClicks);
			}
			if (compareClicks.length == 3) {
				if (checkCorrect()) {
					setTimeout(celebration, 1000);

					function celebration() {
						var nodeArray = document.getElementsByClassName('clicked');
						var clickedCards = [];
						for (var i = 0; i < nodeArray.length; ++i) {
							clickedCards[i] = nodeArray[i];
						}
						for (var cl = 0; cl < clickedCards.length; cl++) {
							clickedCards[cl].classList.add('yeahbaby');
							clickedCards[cl].classList.remove('clicked');
							// setTimeout(replaceCards(clickedCards[cl]), 1000);
						}
						setTimeout(replaceEachCard(), 1000);

						function replaceEachCard(){
						for (var cl = 0; cl < clickedCards.length; cl++) {
							replaceCards(clickedCards[cl])
							clickedCards[cl].classList.remove('yeahbaby');
						}
						console.log('set success!');
						clickedCards = [];
						compareClicks = [];
						wins++;
						console.log(wins);
						document.getElementById('wins').innerHTML = wins;
						}


					}
				} else {
					setTimeout(notaset, 200);

					function notaset() {
						var nodeArray = document.getElementsByClassName('clicked');
						var clickedCards = [];
						for (var i = 0; i < nodeArray.length; ++i) {
							clickedCards[i] = nodeArray[i];
						}
						for (var cl = 0; cl < clickedCards.length; cl++) {
							clickedCards[cl].classList.add('ohdear');
							clickedCards[cl].classList.remove('clicked');
						}
						function clearcards(){
							for (var cl = 0; cl < clickedCards.length; cl++) {
								clickedCards[cl].classList.remove('ohdear');
							}
						}
						setTimeout(clearcards, 1000);
						console.log('set failure!');
						compareClicks = [];
					};
				};
			};

		}
	}
