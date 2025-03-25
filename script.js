document.getElementById("submit").addEventListener("click", startGame);

let player1 = "", player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function startGame() {
    player1 = document.getElementById("player1").value || "Player1";
    player2 = document.getElementById("player2").value || "Player2";

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    currentPlayer = player1;
    currentSymbol = "x";
    document.getElementById("message").innerText = ${currentPlayer}, you're up;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", handleCellClick, { once: true });
    });

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const cellIndex = parseInt(cell.id) - 1;

    if (board[cellIndex] !== "") return;

    board[cellIndex] = currentSymbol;
    cell.innerText = currentSymbol;

    if (checkWinner()) {
        document.getElementById("message").innerText = `${currentPlayer} congratulations you won! `;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("message").innerText = "It's a draw!";
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentSymbol = currentSymbol === "x" ? "o" : "x";
    document.getElementById("message").innerText = ${currentPlayer}, you're up;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
