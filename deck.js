var deck = new Array();
var cardcolor = ["red", "green", "purple"];
var cardnum = ["one", "two", "three"];
var cardsymbol = ["diamond", "squiggle", "oval"];
var cardfill = ["solid", "stripe", "stroke"];

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

function renderDeck() {
	for (var i = 0; i < 32; i++) {
		var card = document.createElement("div");
		var cardinner = document.createElement("div");
		var cardcolor = document.createElement("div");
		var cardnum = document.createElement("div");
		var cardsymbol = document.createElement("div");
		var cardfill = document.createElement("div");
		card.appendChild(cardinner);
		card.className = "card";
		cardinner.className = "cardinner ";
		cardinner.className += deck[i].Cardcolor;
		cardinner.className += " ";
		cardinner.className += deck[i].Cardnum;
		cardinner.className += " ";
		cardinner.className += deck[i].Cardsymbol;
		cardinner.className += " ";
		cardinner.className += deck[i].Cardfill;
		// cardcolor.className = deck[i].Cardcolor;
		// cardnum.className = deck[i].Cardnum;
		// cardsymbol.className = deck[i].Cardsymbol;
		// cardfill.className = deck[i].Cardfill;
		//
		// card.appendChild(cardnum);
		// card.appendChild(cardsymbol);
		// card.appendChild(cardfill);
		document.getElementById("deck").appendChild(card);
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
		console.log("you clicked on a set!");
		return true
	} else {
		console.log("that wasn't a set")
		return false
	}
}

function checkCorrect() {
	var checkingAllCombos = [];

	for (var i = 1; i <= 4; i++) {
		checkingAllCombos.push(numberChecker(i));
		console.log("counter went up by 1")
	};

  var isAllTrue = true;
  for (var k = 0; k < checkingAllCombos.length; k++) {
    if(checkingAllCombos[k] == false) {
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
		// for (var i=0; i<2;){

    // var classList = e.srcElement.classList;

    var classListForComparedClicks = e.srcElement.className.split(/\s+/);
    // compareClicks.push(classListForComparedClicks);

    var element = e.srcElement;

    // if(element.classList.contains('cardinner') && )



		// if (classList.includes("cardinner") && classList.includes("clicked")) {
		// 	// e.srcElement.classList.remove("clicked");
		// 	// e.srcElement.parentNode.classList.remove("clicked");
		// 	// compareClicks = [];
		// 	// console.log("fuck");
		// } else
    if (element.classList.contains("cardinner")) {
			// e.srcElement.className += " clicked";
			e.srcElement.parentNode.classList.add('clicked');
			compareClicks.push(classListForComparedClicks);
			clickedCardz.push(e.srcElement);
			// i++
			// }
			// console.log(compareClicks);
			// compareClicks = [];
		}

		if (compareClicks.length == 3) {

      if(checkCorrect()) {
        console.log('set success!');
      } else {
        console.log('set failure!');
      }

      var clickedCards = document.getElementsByClassName('clicked');
      for (var cl = 0; cl < clickedCards.length; cl++) {
        clickedCards[cl].classList.remove('clicked');
      }

      for (var cl = 0; cl < clickedCards.length; cl++) {
        clickedCards[cl].classList.remove('clicked');
      }

      for (var cl = 0; cl < clickedCards.length; cl++) {
        clickedCards[cl].classList.remove('clicked');
      }

      compareClicks = [];

			// // clickedCards.forEach();
			// // cardsToUnclick.classList.remove("clicked");
			// console.log("success!");
			// if (checkCorrect()) {
			// 	var clickedCards = document.getElementsByClassName("clicked");
			// 	for (var i = 0; i < clickedCards.length; i++) {
			// 		clickedCards[i].classList.remove("clicked");
			// 		// clickedCards[i].parentNode.removeChild(clickedCards);
			// 		// clickedCards[i].parentNode.classList.remove("clicked");
			// 		i = 0;
			// 	}
			// 	console.log("set success!");
			// } else {
			// 	var clickedCards = document.getElementsByClassName("clicked");
			// 	for (var i = 0; i < clickedCards.length; i++) {
			// 		clickedCards[i].classList.remove("clicked");
			// 		// clickedCards[i].parentNode.removeChild(clickedCards);
			// 		// clickedCards[i].parentNode.classList.remove("clicked");
			// 		i = 0;
			// 	}
			// 	console.log("set failure!");
			// }
		}
	}
}
