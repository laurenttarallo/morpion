const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("gameStatus");
const endGameStatus = document.getElementById("endGameStatus");
const playerOne = "./assets/image/arme1.png";
const playerTwo = "./assets/image/arme2.png";
let playerTurn = playerOne;
let cpuMode = false; //pour pouvoir mettre le random//
let cpuChoice; // variable pour l'activation du bouton mode cpu//

// let CPU = randomNumber(0,8)
// function randomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7], // TOUT LES PATERNS gagnants POSSIBLE//
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function enablecpu() {
  clearGrid();
  playerTurn = playerOne;

  cpuMode = !cpuMode;
}

function playGame(e) {
    if (e.innerHTML == "") {
        e.innerHTML = `<img src="${playerTurn}">`;

        if (checkWin(playerTurn)) {
          updateGameStatus("win" + playerTurn);
          return endGame();
        } else if (checkDraw()) {
          updateGameStatus("Draw");
          return endGame();
        } else if (checkDraw()) {
          updateGameStatus("Draw");
          return endGame();
        }
        //ajouter un random cpu//
        // cell.forEach(function(cell)){
        //     if(cell.text)
        // }
        // random = math.cell(math.random()*emptyCell[random]) -1;
        updateGameStatus(playerTurn);
        playerTurn == playerOne ? (playerTurn = playerTwo) : (playerTurn = playerOne); // pour alterner entre croix / rond//
        if (cpuMode == true) {
          Random();
        }
    }
 
}
function Random() {
  cpuChoice = randomNumber(0, 8);
  while (true) {
    if (document.querySelectorAll(".cell")[cpuChoice].innerHTML !== "") {
      cpuChoice = randomNumber(0, 8);
    } else {
      document.querySelectorAll(".cell")[
        cpuChoice
      ].innerHTML = `<img src="${playerTurn}">`;

      break;
    }
  }
}

function checkWin(playerTurn) {
  return winningPatterns.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == `<img src="${playerTurn}">`;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => {
    // pour verifier par quel element est occupée la cellule//
    return (
      cell.innerHTML == `<img src="${playerOne}">` ||
      cell.innerHTML == `<img src="${playerTwo}">`
    );
  });
}

function updateGameStatus(status) {
  let statusText;
  console.log(status);
  switch (status) {
    case "./assets/image/arme1.png":
      statusText = "player 2 go! (O)";
      break;
    case "./assets/image/arme2.png":
      statusText = "player 1 go ! (X)";
      break;
    case "win" + playerOne:
      statusText = "player 1(X) WINNER!";
      break;
    case "win" + playerTwo:
      statusText = " player 2 (O) WINNER!";
      break;
    case "Draw":
      statusText = "EGALITY NO WINNER BANDE DE NOOB!";
      break;
  }
  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function endGame() {
  document.getElementById("gameEnd").style.display = "block";
} //pour afficher l'overlay fini a la fin//
function reloadGame() {
  window.location.reload();
} // pour refresh la page et relancer la partie//
function clearGrid() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}

function playAudio() {
  let audio = document.getElementById("audio");
  audio.play();
}
