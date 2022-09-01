var arrayOfX = [];
var arrayOfO = [];
var arrayOfEmpty = [0,1,2,3,4,5,6,7,8];
var board = arrayOfEmpty;
var chosenLevel;

const humanPlayer = 'X';
const compPlayer = 'O';
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
    
function play(level) {  //se odbira nivo
    document.getElementById('levels').style.display = "none";
    document.getElementById('board').style.pointerEvents = "all";
    chosenLevel = level;
}

function turnX(x) {
        let box = document.getElementById(x.toString());
        box.innerHTML = "X";
        arrayOfEmpty = arrayOfEmpty.filter(item => item !== x);
        board[x]="X";
        arrayOfX.push(x);
        
        box.className = "text cell";
        box.style.pointerEvents = "none";

        if (checkWin(board, "X")) {endgame("X won!");}
        else if (arrayOfEmpty.length === 0) {endgame("Draw!");}
        else {
            switch (chosenLevel) {
                case "easy":
                    easyMove()
                break;
                case "medium":
                    mediumMove()
                break;
                case "hard":
                    hardMove()
                break;
                default:
                    alert(chosenLevel);
            }
        }
}

function easyMove() {   //random move

    var randomCell = arrayOfEmpty[Math.floor(Math.random() * arrayOfEmpty.length)];

    arrayOfEmpty = arrayOfEmpty.filter(item => item !== randomCell);
    board[randomCell]="O";

    arrayOfO.push(randomCell); 

    var theMove = document.getElementById(randomCell);

    theMove.innerHTML = "O";
    theMove.style.pointerEvents = "none";
    theMove.className = "text cell";
    
    if (checkWin(board, "O")) {endgame("O won!");}
}

function mediumMove() {   //60% - hard level, 40% - easy level
    if(Math.floor(Math.random() * 100) < 60) {
        hardMove();
    }
    else {
        easyMove();
    }
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of WINNING_COMBINATIONS.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function emptySquares() {   
	return board.filter(s => typeof s == 'number');
}

function minimax(newBoard, player) {    //minimax algoritam
	var availSpots = emptySquares();

	if (checkWin(newBoard, humanPlayer)) {
		return {score: -10};
	} 
    else if (checkWin(newBoard, compPlayer)) {
		return {score: 10};
	} 
    else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == compPlayer) {
			var result = minimax(newBoard, humanPlayer);
			move.score = result.score;
		} 
        else {
			var result = minimax(newBoard, compPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;
		moves.push(move);
	}

	var bestMove;
	if(player === compPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} 
    else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

function hardMove() { 
    var moveComp = minimax(board, compPlayer).index;

    arrayOfEmpty = arrayOfEmpty.filter(item => item !== moveComp);
    board[moveComp]="O";
    arrayOfO.push(moveComp);

    var theMove2 = document.getElementById(moveComp);
    theMove2.innerHTML = "O";
    theMove2.style.pointerEvents = "none";
    theMove2.className = "text cell";

    if (checkWin(board, "O")) {endgame("O won!");}
}

function endgame(winner) {  //poraka za koj pobedil
    document.getElementById('win').innerHTML = winner;
    document.getElementById('message').classList.remove('inactive');
}

function playAgain() { 
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML="";
        document.getElementById(i).style.pointerEvents = "all";
        arrayOfO = [];
        arrayOfX = [];
        arrayOfEmpty = [0,1,2,3,4,5,6,7,8];
        board = arrayOfEmpty;
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