// Scores for both players
var scores = [0, 0];
var roundScore = 0;

var activePlayer = 0;

var dice = Math.floor(Math.random() * 6) + 1;

document.querySelector('#current-' + activePlayer).textContent = dice;

document.querySelector('.dice').style.display = 'none';