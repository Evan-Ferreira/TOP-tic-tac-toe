const gameLogic = function () {
    const gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    let playerTurn = 'X';
    let winner = '';
    const initializeGame = () => {
        const gameCont = document.querySelector('.ttt-main-cont').children;
        winner = '';
        playerTurn = 'X';
        for (let square of gameCont) {
            square.textContent = '';
            square.addEventListener('click', () => {
                updateGameBoard(square);
            });
        }

        const updateGameBoard = (square) => {
            const x = square.getAttribute('x');
            const y = square.getAttribute('y');
            const rows = gameBoard.length;
            const cols = gameBoard[0].length;
            if (x < 0 || x >= rows || y < 0 || y >= cols) {
                console.log(x, ' and ', y, ' is out of bounds');
                return;
            }
            if (gameBoard[x][y] !== '') {
                console.log('Square already taken');
                return;
            }
            square.textContent = playerTurn;
            if (playerTurn === 'X') {
                gameBoard[x][y] = 'X';
                playerTurn = 'O';
            } else {
                gameBoard[x][y] = 'O';
                playerTurn = 'X';
            }
            checkWin();
            if (winner !== '') {
                console.log('Winner is ', winner);
            }
        };

        const checkWin = () => {
            const rows = gameBoard.length;
            const cols = gameBoard[0].length;
            for (let i = 0; i < rows; i++) {
                if (
                    gameBoard[i][0] === gameBoard[i][1] &&
                    gameBoard[i][1] === gameBoard[i][2]
                ) {
                    winner = gameBoard[i][0];
                    break;
                }
            }
            if (winner === '') {
                for (let i = 0; i < rows; i++) {
                    if (
                        gameBoard[0][i] === gameBoard[1][i] &&
                        gameBoard[1][i] === gameBoard[2][i]
                    ) {
                        winner = gameBoard[0][i];
                        break;
                    }
                }
            }
            if (winner === '') {
                if (
                    gameBoard[0][0] === gameBoard[1][1] &&
                    gameBoard[1][1] === gameBoard[2][2]
                ) {
                    winner = gameBoard[0][0];
                }
            }
            if (winner === '') {
                if (
                    gameBoard[0][2] === gameBoard[1][1] &&
                    gameBoard[1][1] === gameBoard[2][0]
                ) {
                    winner = gameBoard[0][2];
                }
            }
            if (winner === '') {
                document.querySelector('.game-msg').textContent =
                    "It's player " + playerTurn + "'s turn";
            } else {
                document.querySelector('.game-msg').textContent =
                    'Player ' + winner + ' wins!';
            }
        };
    };
    document.querySelector('.game-msg').textContent =
        "Game initialized, it's " + playerTurn + "'s turn";
    initializeGame();
};

const playGames = function () {
    const reset = document.querySelector('.reset-btn');
    reset.addEventListener('click', () => {
        console.log('Game started');
        gameLogic();
    });
};
gameLogic();
playGames();
