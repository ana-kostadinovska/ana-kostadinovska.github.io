let counter = 0;
var arrayOfX = [];
var arrayOfO = [];
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

function writeS(x) {
    let box = document.getElementById(x.toString());

    if(counter % 2 == 0){
        box.innerHTML = "X";
        document.getElementById("player1").classList.remove("active");
        document.getElementById("player2").className = "active";

        arrayOfX.push(x);

        if (checkWin('X')) { endgame("X won!"); }
        else if (counter == 8) { endgame("Draw!"); }
    } 
    else {
        box.innerHTML = "O";
        document.getElementById("player1").className = "active";
        document.getElementById("player2").classList.remove("active");

        arrayOfO.push(x);

        if (checkWin('O')) { endgame ("O won!") };
    }
    box.style.pointerEvents = "none";
    box.className = "text cell";
    counter++;
}
        
function checkWin(symbol) {
    var result = false;
    for (var i = 0; i < 8; i++){
        var elem = WINNING_COMBINATIONS[i];
        if (symbol = 'O') {
            result = result || (elem.every(val => arrayOfO.includes(val)));
        } 
        if (symbol = 'X') {
            result = result || (elem.every(val => arrayOfX.includes(val)));
        }
    }
    return result;
}

function endgame(winner) {  //poraka za koj pobedil
    document.getElementById('win').innerHTML = winner;
    document.getElementById('message').classList.remove('inactive');
}

function playAgain() { 
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML="";
        document.getElementById(i).style.pointerEvents = "all";

        document.getElementById("player1").className = "active";
        document.getElementById("player2").classList.remove("active");

        arrayOfO = [];
        arrayOfX = [];
        counter = 0;
    }
    document.getElementById('message').className="result inactive";
}

function dark() {
    document.documentElement.classList.toggle('dark-mode');
    let mode = document.getElementById('mode');
    if (mode.className == "fa-solid fa-sun") {
        mode.className = "fa-solid fa-moon";
    } 
    else {
        mode.className = "fa-solid fa-sun";
    }
}