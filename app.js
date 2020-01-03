/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



// document.querySelector('.btn-roll').addEventListener('click', rollDice); //dodawanie eventu do przycisku roll
// alternatywa - anonymous function. Można pisać od razu funkcję. Można jej użyć tylko tu
// document.querySelector('.btn-roll').addEventListener('click', function() {
//     tu piszemy funkcję, czyli tak jak niżej
// })

let scores, roundScore, activePlayer, gamePlaying;
initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. generowanie numery na kostce
        let dice = Math.floor(Math.random() * 6) + 1;
        
        //2. wyświetlanie wyniku
        let diceDOM =  document.querySelector('.dice'); //"chwytamy" kostkę i zapisujemy ją do zmiennej żeby ciągle nie powtarzać querySelector
        diceDOM.style.display = 'block'; //diceDOM jako querySelector
        diceDOM.src='dice-' + dice + '.png';

        //3. aktualizowanie wyniku rundy jeśli wylosoway numer NIE był 1. Jeśli 1 to przepada i gra następny
        if (dice !== 1) {
            //dodawaie wyniku
            roundScore += dice; //Dodawanie kostki do aktualnego wyniku rundy. to samo jak roundScore = roundScore + dice. 
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //wyświetlanie wyniku
        } else {
            //jeśli 1, to następny gracz
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Dodawawnie aktualnego wyniku do globalnego
        scores[activePlayer] += roundScore; //np scores[1] bo activePlayer to 0 lub 1. Wtedy do tego indexu dodajemy wynik rundy

        //2. Aktualizowanie interfejsu
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; //do globalnego wyniku przypisuje wynik aktualnego gracza z tablicy wyników
        
        //3. Sprawdzenei czy graacz wygrał grę
        if (scores[activePlayer] >= 20) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', initGame); //wywołujemy initGame, która zeruje wszyskto
//żeby nie powtarzać wyżej zerowania (bo byłoby na początku i tu) to piszemy funkcję, która to zeruje
function initGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; //ukrycie kostki na start
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
//funkcja, która zmienia active playera, zeruje wyniki, zmienia rundę itd. Po to żeby jej nie powtarzać w dwóch miejscach
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    //jeśli aP jest 0 to zmień aP na 1. W przeciwnym wypadku (jeśli aP jest 1) to zmień na 0
    //to samo co if i else
    roundScore = 0; //zerowanie wyników
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //dodawanie klasy active do aktualnego gracza
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    //to wyżej usuwa tylko zerowemu i dodaje 1, nie na odwrót. Trzeba by pisać ify. Ale można to zrobić tak jak niżej
    document.querySelector('.player-0-panel').classList.toggle('active'); //jeśli ma klasę activ to mu usuń, jak nie ma to mu dodaj
    document.querySelector('.player-1-panel').classList.toggle('active'); //to samo co wyżej
    document.querySelector('.dice').style.display = 'none';
}




// document.querySelector('#current-' + activePlayer).textContent = dice; //pokazanie wartości kostki graczowi, który losował