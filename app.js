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
            globalPt: 0,
            currentPt: 0,
        };
        
        // Define the prototype's methods
        player.prototype = {
            // Return the id of the player
            getID: function() {
                return this.id;
            },
        
            // Return the global point of the player
            getGlobalPoint: function() {
                return this.globalPt;
            },
        
            // Return the current point of the player
            getCurrentPoint: function() {
                return this.currentPt;
            }
        };
        
        // Create the 2 players
        var player_0 = Object.create(player);
        player_0.id = 0;
        player_0.globalPt = 0;
        player_0.currentPt = 0;
        
        var player_1 = Object.create(player);
        player_1.id = 1;
        player_1.globalPt = 0;
        player_1.currentPt = 0;
    
        // Setup the game object
        this.theGame = {
            winningPt: 100,
            players: [player_0, player_1],
            activePlayer: player_0,

            // Give the turn to the next player
            nextPlayerTurn: function() {
                var activeIndex = this.players.indexOf(this.activePlayer);
                if (activeIndex >= this.players.length - 1) {
                    activeIndex = 0;
                } else {
                    activeIndex++;
                }
                this.activePlayer = this.players[activeIndex];
            },

            rollDice: function() {
                // Get a random number between 1 and 6
                var dice = Math.floor(Math.random() * (7 - 1) + 1);
                // Update the dice image
                document.getElementById('dice').src = 'dice-' + dice + '.png';

                if (dice === 1) { // If rolled dice is 1, reset current point of active player to 0, the other player takes turn
                    this.activePlayer.currentPt = 0;
                    document.getElementById('current-' + this.activePlayer.id).innerHTML = this.activePlayer.currentPt;
                    this.nextPlayerTurn();
                } else { // Otherwise, the active player's current point is increased
                    this.activePlayer.currentPt += dice;
                    document.getElementById('current-' + this.activePlayer.id).innerHTML = this.activePlayer.currentPt;
                }
            },
        
            // Add current point to global point and reset current point to 0
            hold: function() {
                this.activePlayer.globalPt += this.activePlayer.currentPt;
                this.activePlayer.currentPt = 0;
                document.getElementById('score-' + this.activePlayer.id).innerHTML = this.activePlayer.globalPt;
                document.getElementById('current-' + this.activePlayer.id).innerHTML = this.activePlayer.currentPt;

                if (this.activePlayer.globalPt >= this.winningPt) {
                    alert('Player ' + this.activePlayer.id + ' WIN!!!');
                    startNewGame();
                } else {
                    this.nextPlayerTurn();
                }
            },
        };

        // Reset game state
        document.getElementById('score-0').innerHTML = 0;
        document.getElementById('score-1').innerHTML = 0;
        document.getElementById('current-0').innerHTML = 0;
        document.getElementById('current-1').innerHTML = 0;

        // Setup onclick event listeners
        document.getElementById('new-game').onclick = function() {
            startNewGame();
        };
        document.getElementById('roll-dice').onclick = function() {
            theGame.rollDice()
        };
        document.getElementById('hold').onclick = function() {
            theGame.hold();
        };
    };

    startNewGame();
}())