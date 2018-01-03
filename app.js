/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player loses all of his score if he rolls 2 6 dice in a row, then it's the next player's turn

*/

;(function() {
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

    /**
     * The game object is reponsible for holding the game state and handling the game
     */
    this.theGame = {
        winningPt: 100,
        roundPt: 0,
        previousDice: 0,
        players: [player_0, player_1],
        activePlayer: player_0,
        isPlaying: true,

        /**
         * Give the turn to the next player
         */
        nextPlayerTurn: function() {
            // Reset for the next turn
            document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt = 0;
            this.previousDice = 0;

            // Find the next player and set him to be active player
            var activeIndex = this.players.indexOf(this.activePlayer);
            document.querySelector('.player-' + this.activePlayer.id +'-panel').classList.toggle('active');
            if (activeIndex >= this.players.length - 1) {
                activeIndex = 0;
            } else {
                activeIndex++;
            }
            this.activePlayer = this.players[activeIndex];
            document.querySelector('.player-' + this.activePlayer.id +'-panel').classList.toggle('active');

            // Hide the hold button at the beginning of the round since round point is 0
            document.getElementById('hold').style.display = 'none';
        },

        /**
         * Let the active player roll a dice and decide how the game advance depending on the result
         */
        rollDice: function() {
            if (this.isPlaying) {
                // Display the hold button
                document.getElementById('hold').style.display = 'block';

                // Get a random number between 1 and 6
                var dice = Math.floor(Math.random() * (7 - 1) + 1);
                console.log('Player ' + (this.activePlayer.id + 1) + ' rolls ' + dice);
                console.log('Previous dice = ' + this.previousDice);

                // Update the dice image
                var diceImg = document.getElementById('dice-' + this.activePlayer.id);
                diceImg.style.visibility = 'visible';
                diceImg.src = 'dice-' + dice + '.png';

                // Deciding how the game advance based on the dice result
                if (dice === this.previousDice && this.previousDice === 6) { // If the player rolls two 6 dice in a row
                    console.log('Player ' + (this.activePlayer.id + 1) + ' rolls two 6 dice in a row');
                    this.updateActivePlayerPoint(0); // He loses all of his point
                    this.nextPlayerTurn();
                } else {
                    this.previousDice = dice;
                    if (dice === 1) { // If rolled dice is 1, reset current point of active player to 0, the other player takes turn
                        this.nextPlayerTurn();
                    } else { // Otherwise, the active player's current point is increased
                        this.roundPt += dice;
                        document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt;
                    }
                }
            }
            console.log('--------------------');
        },

        // Add current point to global point and reset current point to 0
        hold: function() {
            if (this.isPlaying) {
                var newPoint = this.activePlayer.point + this.roundPt;
                this.updateActivePlayerPoint(newPoint);
                document.getElementById('current-' + this.activePlayer.id).textContent = this.roundPt;

                if (this.activePlayer.point >= this.winningPt) {
                    var activePlayerPanel = document.querySelector('.player-' + this.activePlayer.id + '-panel');
                    activePlayerPanel.classList.add('winner');
                    activePlayerPanel.classList.toggle('active');
                    document.getElementById('name-' + this.activePlayer.id).textContent = 'WINNER';
                    this.isPlaying = false;
                } else {
                    this.nextPlayerTurn();
                }
            }
        },

        updateActivePlayerPoint: function(newPoint) {
            this.activePlayer.point = newPoint;
            document.getElementById('score-' + this.activePlayer.id).textContent = this.activePlayer.point;
        },
    };

    function startNewGame() {
        // Reset game state
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');

        document.getElementById('hold').style.display = 'none';

        document.getElementById('name-0').textContent = 'PLAYER 1';
        document.getElementById('name-1').textContent = 'PLAYER 2';
        document.getElementById('score-0').textContent = player_0.point = 0;
        document.getElementById('score-1').textContent = player_1.point = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.getElementById('dice-0').style.visibility = 'hidden';
        document.getElementById('dice-1').style.visibility = 'hidden';
        theGame.isPlaying = true;
    };

    // Setup onclick event listeners
    document.getElementById('new-game').addEventListener('click', startNewGame);
    document.getElementById('roll-dice').addEventListener('click', function() { theGame.rollDice(); });
    document.getElementById('hold').addEventListener('click', function() { theGame.hold(); });

    startNewGame();
}());