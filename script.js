document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submit").addEventListener("click", startGame);
    document.getElementById("restart").addEventListener("click", restartGame);
});

let player1 = "", player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function startGame() {
    player1 = document.getElementById("player1").value || "Player 1";
    player2 = document.getElementById("player2").value || "Player 2";

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    currentPlayer = player1;
    currentSymbol = "x";
    document.getElementById("message").innerText = `${currentPlayer}, you're up`;

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.style.color = "black";
        cell.removeEventListener("click", handleCellClick);
        cell.addEventListener("click", handleCellClick, { once: true });
    });
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const cellIndex = parseInt(cell.id) - 1;

    if (board[cellIndex] !== "") return;

    board[cellIndex] = currentSymbol;
    cell.innerText = currentSymbol;
    
    const winner = checkWinner();
    if (winner) {
        document.getElementById("message").innerText = `${currentPlayer}, congratulations you won!`;
        highlightWinningCells(winner);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== "")) {
        document.getElementById("message").innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentSymbol = currentSymbol === "x" ? "o" : "x";
    document.getElementById("message").innerText = `${currentPlayer}, you're up`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // Return winning cells
        }
    }
    return null;
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        document.getElementById((index + 1).toString()).style.color = "red";
    });
}

function restartGame() {
    document.getElementById("startScreen").style.display = "flex";
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
}
