document.getElementById("submit").addEventListener("click", function() {
    let player1 = document.getElementById("player-1").value.trim();
    let player2 = document.getElementById("player-2").value.trim();
    
    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    document.getElementById("player-form").style.display = "none";
    document.getElementById("game").style.display = "block";

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let currentSymbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let cells = document.querySelectorAll(".cell");
    let messageBox = document.querySelector(".message");

    messageBox.innerText = `${currentPlayer}, you're up!`;

    cells.forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", function() {
            let index = parseInt(this.id) - 1;

            if (board[index] === "" && !checkWinner(board)) {
                board[index] = currentSymbol;
                this.innerText = currentSymbol;

                if (checkWinner(board)) {
                    messageBox.innerText = `${currentPlayer} Congratulations, you won!`;
                    document.getElementById("reset").style.display = "block";
                    return;
                }

                // Switch Player
                currentPlayer = (currentPlayer === player1) ? player2 : player1;
                currentSymbol = (currentSymbol === "X") ? "O" : "X";
                messageBox.innerText = `${currentPlayer}, you're up!`;
            }
        });
    });

    document.getElementById("reset").addEventListener("click", function() {
        board.fill("");
        cells.forEach(cell => cell.innerText = "");
        messageBox.innerText = `${player1}, you're up!`;
        currentPlayer = player1;
        currentSymbol = "X";
        this.style.display = "none";
    });
}

function checkWinner(board) {
    let winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern =>
        board[pattern[0]] !== "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
    );
}
