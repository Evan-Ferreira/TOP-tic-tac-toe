const gameLogic = function () {
    const initializeGame = () => {
        const gameBoard = document.querySelector('.ttt-main-cont').childNodes;
        for (square of gameBoard) {
            square.addEventListener('click', () => {
                console.log('clicked');
            });
        }
    };
    initializeGame();
};

gameLogic();
