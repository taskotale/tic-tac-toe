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

let available = [];

(player = (sign, turn) => {
    let playerTurn = turn;
    return {
        sign: sign,
        isTurn: () => playerTurn ? playerTurn = false : playerTurn = true
    }
});

const playerOne = player('X', true);
const playerTwo = player('O', false);

(gamePlay = (whereToLook, firstPlayer, secondPlayer) => {
    const grid = whereToLook.querySelectorAll('div');
    grid.forEach(tile => {
        tile.addEventListener('click', e => {
            let playPosition = e.target;
            playPosition.textContent = checkSign(firstPlayer, secondPlayer);
            gameBoard[playPosition.id][playPosition.classList] = playPosition.textContent;
        }, { once: true })
    })
})((getIdElementFromDom('board')), playerOne, playerTwo);

(checkSign = (player, otherPlayer) => {
    if (!player.isTurn()) {
        return player.sign
    }
    return otherPlayer.sign
});


