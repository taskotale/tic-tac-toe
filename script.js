(getIdElementFromDom = (id) => {
    return document.getElementById(id)
});

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

(createBoardOnScreen = (whereTo) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const spot = document.createElement('div');
            spot.id = `${[i]}`;
            spot.classList = `${[j]}`;
            whereTo.appendChild(spot);
        }
    }
})((getIdElementFromDom('board')));

(findAvailableSpots = (board) => {
    let availableSpots = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                availableSpots.push(board[i][j])
            }
        }
    }
    return availableSpots
})(gameBoard);


(player = (sign, turn) => {
    let playerTurn = turn;
    return {
        sign: sign,
        isTurn: () => playerTurn ? playerTurn = false : playerTurn = true
    }
});

const playerOne = player('X', true);
const playerTwo = player('O', false);

(checkTurn = (player, otherPlayer) => {
    if (!player.isTurn()) {
        return player.sign
    }
    return otherPlayer.sign
});

(checkWinner = (board) => {
    let winner
    areEqual = (a, b, c) => {
        return (a == b && b == c && a != '')
    }
    winnerIs = () => {
        for (let i = 0; i < 3; i++) {
            if (areEqual(board[i][0], board[i][1], board[i][2])) {
                winner = board[i][0]
            }
        }
        for (let i = 0; i < 3; i++) {
            if (areEqual(board[0][i], board[1][i], board[2][i])) {
                winner = board[0][i]
            }
        }
        if (areEqual(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0]
        }

        if (areEqual(board[0][2], board[1][1], board[2][0])) {
            winner = board[0][2]
        }
        return winner
    }

    if (findAvailableSpots(board).length == 0) {
        return 'it`s a tie'
    }
    return winnerIs();
});


(gamePlay = (whereToLook, firstPlayer, secondPlayer) => {
    const grid = whereToLook.querySelectorAll('div');
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', e => {
            let playPosition = e.target;
            playPosition.textContent = checkTurn(firstPlayer, secondPlayer);
            gameBoard[playPosition.id][playPosition.classList] = playPosition.textContent;
            console.log(checkWinner(gameBoard))
            console.log('who '+(checkWinner(gameBoard) === ('X' | 'O')))
        if (checkWinner(gameBoard) === 'X' || checkWinner(gameBoard) === 'O') {
                alert('winner is: ' + checkWinner(gameBoard))
                confirm('do you want to play again?') ? newGame() : console.log('no')
            }
        },
            { once: true })
    }
})((getIdElementFromDom('board')), playerOne, playerTwo);


const newGame = () => {
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    (removeOldBoard = (domBoard) => {
        while (domBoard.firstChild) {
            domBoard.removeChild(domBoard.firstChild);
        }
    })((getIdElementFromDom('board')));
    createBoardOnScreen(getIdElementFromDom('board'));
    gamePlay((getIdElementFromDom('board')), playerOne, playerTwo);
};

(getIdElementFromDom('new-game')).addEventListener('click', newGame)

