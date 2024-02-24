document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restart');
    const playerVPlayer = document.getElementById('playerVPlayer');
    const playerVComputer = document.getElementById('playerVComputer');
    const gameStatus = document.getElementById('gameStatus');
    const gameDurationDisplay = document.getElementById('gameDuration');
    let currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    let gameMode = 'playerVPlayer';
    let gameDuration = 0;
    let timer;

    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.addEventListener('click', cellClicked);
            board.appendChild(cell);
        }
        updateGameStatus();
        startTimer();
    }

    function cellClicked(e) {
        if (e.target.textContent === '') {
            e.target.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                gameStatus.textContent = `${currentPlayer} wins!`;
                stopGame();
                return;
            } else if (checkTie()) {
                gameStatus.textContent = "It's a tie!";
                stopGame();
                return;
            }
            switchPlayer();
        } else if (gameMode === 'playerVComputer' && currentPlayer === 'O') {
            computerMove();
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameStatus();
        if (gameMode === 'playerVComputer' && currentPlayer === 'O') {
            setTimeout(computerMove, 500); // Delay for computer's move
        }
    }

    function updateGameStatus() {
        gameStatus.textContent = `It is ${currentPlayer}'s turn`;
    }

    function computerMove() {
        let availableCells = [...board.children].filter(c => c.textContent === '');
        if (availableCells.length > 0) {
            let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            randomCell.textContent = 'O';
            if (checkWin('O')) {
                gameStatus.textContent = "O wins!";
                stopGame();
                return;
            } else if (checkTie()) {
                gameStatus.textContent = "It's a tie!";
                stopGame();
                return;
            }
            switchPlayer();
        }
    }

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        let win = winPatterns.find(pattern => {
            return pattern.every(index => {
                return board.children[index].textContent === player;
            });
        });
        if (win) {
            highlightWin(win);
            return true;
        }
        return false;
    }

    function highlightWin(pattern) {
        pattern.forEach(index => {
            board.children[index].style.backgroundColor = '#90ee90'; // Light green to highlight win
        });
    }

    function checkTie() {
        return [...board.children].every(cell => cell.textContent !== '');
    }

    function stopGame() {
        [...board.children].forEach(cell => cell.removeEventListener('click', cellClicked));
        clearInterval(timer);
    }

    function startTimer() {
        gameDuration = 0;
        timer = setInterval(() => {
            gameDuration++;
            gameDurationDisplay.textContent = `Game Duration: ${gameDuration}s`;
        }, 1000);
    }

    restartButton.addEventListener('click', createBoard);
    playerVPlayer.addEventListener('change', () => gameMode = 'playerVPlayer');
    playerVComputer.addEventListener('change', () => {
        gameMode = 'playerVComputer';
        currentPlayer = 'X'; // Player always starts as X in Player vs Computer mode
        createBoard();
    });

    createBoard(); // Initialize the game board
});
