(function runGame() {
  // restricted variant of JavaScript
  "use strict";

  var display = document.getElementById('cards');
  var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var card = null;

  var button = document.createElement("button");
  button.innerHTML = "New Hand";
  var aside = document.querySelector("aside");
  aside.appendChild(button);
  button.addEventListener('click', function() {
    newHand();
  })

  function hit() {
    card = Math.floor(Math.random() * cards.length);
    display.innerHTML += " " + cards[card];
    checkResult(false, true);
    console.log(cards[card]);
  }
  document.getElementById('hit').addEventListener('click', hit);

  function newHand() {
    card = Math.floor(Math.random() * cards.length);
    display.innerHTML = cards[card];
    card = Math.floor(Math.random() * cards.length);
    display.innerHTML = display.innerHTML + ' ' + cards[card];
    checkResult();
  }

  /**
   * Check the result of the current cards and alert the game result
   *
   * @param  {Boolean} standing  Whether or not the player is standing
   * @param  {Boolean} hitting   Whether or not the player is hitting
   * @return {void}
   */
  function checkResult(standing, hitting) {
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
