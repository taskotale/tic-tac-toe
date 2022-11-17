(getIdElementFromDom = (id) => {
    return document.getElementById(id)
});

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

(findAvailableSpots = (board) => {
    let availableSpots =[];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                availableSpots.push(board[i][j])
            }
        }
    }
    return availableSpots
})(gameBoard);

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

(player = (sign, turn) => {
    let playerTurn = turn;
    return {
        sign: sign,
        isTurn: () => playerTurn ? playerTurn = false : playerTurn = true
    }
});

const playerOne = player('X', true);
const playerTwo = player('O', false);

(checkWinner = (board) => {
    let winner;
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
});

    (gamePlay = (whereToLook, firstPlayer, secondPlayer) => {
        const grid = whereToLook.querySelectorAll('div');
        grid.forEach(tile => {
            tile.addEventListener('click', e => {
                let playPosition = e.target;
                playPosition.textContent = checkSign(firstPlayer, secondPlayer);
                gameBoard[playPosition.id][playPosition.classList] = playPosition.textContent;
                checkWinner(gameBoard)
            }, { once: true })
        })
    })((getIdElementFromDom('board')), playerOne, playerTwo);

(checkSign = (player, otherPlayer) => {
    if (!player.isTurn()) {
        return player.sign
    }
    return otherPlayer.sign
});