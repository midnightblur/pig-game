/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

;(function() {;
    function startNewGame() {
        // Define the player prototype
        var player = {
            id: -1,
            point: 0,
        };
        
        // Create the 2 players
        var player_0 = Object.create(player);
        player_0.id = 0;
        player_0.point = 0;
        
        var player_1 = Object.create(player);
        player_1.id = 1;
        player_1.point = 0;
    
        // Setup the game object
        this.theGame = {
            winningPt: 100,
            roundPt: 0,
            players: [player_0, player_1],
            activePlayer: player_0,

            // Give the turn to the next player
            nextPlayerTurn: function() {
                var activeIndex = this.players.indexOf(this.activePlayer);
                document.querySelector('.player-' + this.activePlayer.id +'-panel').classList.toggle('active');
                if (activeIndex >= this.players.length - 1) {
                    activeIndex = 0;
                } else {
                    activeIndex++;
                }
                this.activePlayer = this.players[activeIndex];
                document.querySelector('.player-' + this.activePlayer.id +'-panel').classList.toggle('active');
                document.getElementById('dice').style.display = 'none';
            },

            rollDice: function() {
                // Get a random number between 1 and 6
                var dice = Math.floor(Math.random() * (7 - 1) + 1);
                // Update the dice image
                var diceImg = document.getElementById('dice');
                diceImg.style.display = 'block';
                diceImg.src = 'dice-' + dice + '.png';

                if (dice === 1) { // If rolled dice is 1, reset current point of active player to 0, the other player takes turn
                    this.roundPt = 0;
                    document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt;
                    this.nextPlayerTurn();
                } else { // Otherwise, the active player's current point is increased
                    this.roundPt += dice;
                    document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt;
                }
            },
        
            // Add current point to global point and reset current point to 0
            hold: function() {
                this.activePlayer.point += this.roundPt;
                this.roundPt = 0;
                document.getElementById('score-' + this.activePlayer.id).textContent = this.activePlayer.point;
                document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt;

                if (this.activePlayer.point >= this.winningPt) {
                    alert('Player ' + (this.activePlayer.id + 1) + ' WIN!!!');
                    startNewGame();
                } else {
                    this.nextPlayerTurn();
                }
            },
        };

        // Reset game state
        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.getElementById('dice').style.display = 'none';

        // Setup onclick event listeners
        document.getElementById('new-game').addEventListener('click', startNewGame);
        document.getElementById('roll-dice').addEventListener('click', function() { theGame.rollDice(); });
        document.getElementById('hold').addEventListener('click', function() { theGame.hold(); });
        // document.getElementById('new-game').onclick = function() {
        //     startNewGame();
        // };
        // document.getElementById('roll-dice').onclick = function() {
        //     theGame.rollDice()
        // };
        // document.getElementById('hold').onclick = function() {
        //     theGame.hold();
        // };
    };

    startNewGame();
}());