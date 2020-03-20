/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, randomScore, scorePlayer, gamePlaying;

var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var btnNewGame = document.querySelector('.btn-new');

var diceImage_1 = document.querySelector('#dice-1');
var diceImage_2 = document.querySelector('#dice-2');
var current_0 = document.getElementById('current-0');
var current_1 = document.getElementById('current-1');

newGame();


btnRoll.addEventListener('click', function () {
    if (gamePlaying) {
        // random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var lastDice = Math.floor(Math.random() * 6) + 1;

        // display Result
        diceImage_1.style.display = 'block';
        diceImage_2.style.display = 'block';
        diceImage_1.src = 'dice-' + dice + '.png';
        diceImage_2.src = 'dice-' + lastDice + '.png';

        // update the score if the random is not a 1
        if (dice > 1 && lastDice > 1) {
            randomScore += dice + lastDice;
            document.querySelector('#current-' + activePlayer).textContent = randomScore;
        } else {
            nextPlayer();
        }
    }


});

btnHold.addEventListener('click', function () {

    if (gamePlaying) {
        // Add current score to global score
        scorePlayer[activePlayer] += randomScore;

        // apdate UI
        document.querySelector('#score-' + activePlayer).textContent = scorePlayer[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;
        diceImage_1.style.display = 'none';
        diceImage_2.style.display = 'none';

        var inputValue = document.querySelector('.final-score').value;
        var winningScore;

        if(inputValue){
            winningScore = inputValue;
        }else{
            winningScore = 100;
        }

        // next Player
        if (scorePlayer[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

btnNewGame.addEventListener('click', newGame);


function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    randomScore = 0;

    current_0.textContent = 0;
    current_1.textContent = 0;

    diceImage_1.style.display = 'none';
    diceImage_2.style.display = 'none';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


function newGame() {
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    current_0.textContent = '0';
    current_1.textContent = '0';

    scorePlayer = [0, 0]
    activePlayer = 0;
    randomScore = 0;

    gamePlaying = true;

    diceImage_1.style.display = 'none';
    diceImage_2.style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}
