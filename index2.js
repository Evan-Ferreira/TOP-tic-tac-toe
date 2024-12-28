class gameInstance {
    constructor() {
        this.gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.playerTurn = 'X';
        this.winner = '';
    }

    initializeGame() {
        document.querySelector('.game-msg').textContent =
            "Game initialized, it's " + this.playerTurn + "'s turn";
        const gameCont = document.querySelector('.ttt-main-cont').children;
        for (let square of gameCont) {
            square.textContent = '';
            square.addEventListener('click', () => {
                this.#updateGameBoard(square);
            });
        }
    }

    #updateGameBoard(square) {
        const x = square.getAttribute('x');
        const y = square.getAttribute('y');
        const rows = this.gameBoard.length;
        const cols = this.gameBoard[0].length;
        if (x < 0 || x >= rows || y < 0 || y >= cols) {
            console.log(x, ' and ', y, ' is out of bounds');
            return;
        }
        if (this.gameBoard[x][y] !== '') {
            console.log('Square already taken');
            return;
        }
        square.textContent = this.playerTurn;
        if (this.playerTurn === 'X') {
            this.gameBoard[x][y] = 'X';
            this.playerTurn = 'O';
        } else {
            this.gameBoard[x][y] = 'O';
            this.playerTurn = 'X';
        }
        this.#checkWin();
    }

    #checkWin() {
        const rows = this.gameBoard.length;
        const cols = this.gameBoard[0].length;
        for (let i = 0; i < rows; i++) {
            if (
                this.gameBoard[i][0] === this.gameBoard[i][1] &&
                this.gameBoard[i][1] === this.gameBoard[i][2]
            ) {
                this.winner = this.gameBoard[i][0];
                break;
            }
        }
        if (this.winner === '') {
            for (let i = 0; i < rows; i++) {
                if (
                    this.gameBoard[0][i] === this.gameBoard[1][i] &&
                    this.gameBoard[1][i] === this.gameBoard[2][i]
                ) {
                    this.winner = this.gameBoard[0][i];
                    break;
                }
            }
        }
        if (this.winner === '') {
            if (
                this.gameBoard[0][0] === this.gameBoard[1][1] &&
                this.gameBoard[1][1] === this.gameBoard[2][2]
            ) {
                this.winner = this.gameBoard[0][0];
            }
        }
        if (this.winner === '') {
            if (
                this.gameBoard[0][2] === this.gameBoard[1][1] &&
                this.gameBoard[1][1] === this.gameBoard[2][0]
            ) {
                this.winner = this.gameBoard[0][2];
            }
        }
        if (this.winner === '') {
            document.querySelector('.game-msg').textContent =
                "It's player " + this.playerTurn + "'s turn";
        } else {
            document.querySelector('.game-msg').textContent =
                'Player ' + this.winner + ' wins!';
        }
    }
}

const playGames = function () {
    const reset = document.querySelector('.reset-btn');
    reset.addEventListener('click', () => {
        const game = new gameInstance();
        game.initializeGame();
    });
};
const start = new gameInstance();
start.initializeGame();
playGames();
