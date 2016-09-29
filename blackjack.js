(function runGame() {
  // restricted variant of JavaScript
  "use strict";

  var display = document.getElementById('cards');
  var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // newHand button
  var button = document.createElement("button");
  button.innerHTML = "New Hand";
  var aside = document.querySelector("aside");
  aside.appendChild(button);
  button.addEventListener('click', newHand);

  function hit() {
    display.innerHTML += " " + drawCard();
    checkResult(false);
  }
  // calls the object function 'hit'
  document.getElementById('hit').addEventListener('click', hit);

  // newHand function displays 2 random cards, then calls checkResult
  function newHand() {
    display.innerHTML = drawCard() + ' ' + drawCard();
    checkResult();
  }
  // drawCard function returns a random card
  function drawCard() {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  function checkResult(standing) {
    var hand = display.innerHTML.split(' ');
    var cardValue = 0;

    hand.forEach(function(card) {
      if (Number(card)) {
        cardValue += Number(card);
      } else if (card === 'J' || card === 'Q' || card === 'K') {
        cardValue += 10;
      } else if (card === 'A') {
        if ((cardValue + 11) > 21) {
          cardValue += 1;
        } else {
          cardValue += 11;
        }
      }
    });

    if (cardValue < 16 && standing) {
      alert('Dealer wins.');
    } else if (cardValue <= 18 && standing) {
      alert('Push!');
    } else if (cardValue > 21) {
      alert('You Bust.');
    } else if (cardValue > 18 && standing || cardValue === 21) {
      alert('You win!');
    } else {
      return;
    }
  }

  document.getElementById('stand').addEventListener('click', function() {
    checkResult(true);
  });

  newHand();
  // undefined argument is falsy
})();
