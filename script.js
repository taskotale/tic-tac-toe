(getGameboard = () => {
    return gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
})();

(getBoardFromDom = () => {
    return domBoard = document.getElementById('board')
})();

(player = (sign, turn) => {
    let playerTurn = turn;
    return {
        sign: sign,
        isTurn: () => playerTurn ? playerTurn = false : playerTurn = true
    }
});

(getPlayerOne = () => {
    return playerOne = player('X', true)
})();

(getPlayerTwo = () => {
    return playerTwo = player('O', false)
})();

(getFirstPlayer = (firstPlayer, whereToAppend) => {
    const selectPlayerOne = document.createElement('div');
    const inputPlayerName = document.createElement('input');
    selectPlayerOne.appendChild(inputPlayerName);
    inputPlayerName.addEventListener('keyup', e => firstPlayer.name = inputPlayerName.value);
    const firstPlayerSign = document.createElement('div');
    firstPlayerSign.classList = 'first-player';
    selectPlayerOne.appendChild(firstPlayerSign);
    whereToAppend.appendChild(selectPlayerOne);
});

(getSecondPlayer = (secondPlayer, whereToAppend) => {
    const selectPlayerTwo = document.createElement('div');
    selectPlayerTwo.classList = 'second-player'
    const playerTwoHuman = document.createElement('div');
    playerTwoHuman.textContent = 'HUMAN';
    playerTwoHuman.addEventListener('click', e => playerTwoHumanSelection(selectPlayerTwo, playerTwoComputer, playerTwoHuman, secondPlayer), { once: true });
    const playerTwoComputer = document.createElement('div');
    playerTwoComputer.textContent = 'COMPUTER';
    playerTwoComputer.addEventListener('click', e => playerTwoComputerSelection(selectPlayerTwo, playerTwoHuman, playerTwoComputer, secondPlayer), { once: true });
    selectPlayerTwo.appendChild(playerTwoHuman);
    selectPlayerTwo.appendChild(playerTwoComputer);
    whereToAppend.appendChild(selectPlayerTwo);
});

(playerTwoHumanSelection = (parent, sibling, human, humanName) => {
    parent.removeChild(sibling);
    const playerTwoName = document.createElement('input');
    const submitNameBtn = document.createElement('button');
    submitNameBtn.textContent = 'Start Game'
    human.appendChild(playerTwoName);
    human.appendChild(submitNameBtn);
    submitNameBtn.addEventListener('click', e => {
        humanName.name = playerTwoName.value
        parent.parentElement.remove()
    })
});

(playerTwoComputerSelection = (parent, sibling, computer, computerName) => {
    parent.removeChild(sibling);
    const compDumb = document.createElement('div');
    compDumb.textContent = 'Dumb Computer';
    const compGenius = document.createElement('div');
    compGenius.textContent = 'Genius Computer';
    computer.appendChild(compDumb);
    computer.appendChild(compGenius);
    compDumb.addEventListener('click', e => {
        computerName.name = compDumb.textContent;
        parent.parentElement.remove()
    })
    compGenius.addEventListener('click', e => {
        computerName.name = compGenius.textContent;
        parent.parentElement.remove()
    })
});

(startGame = (firstPlayer, secondPlayer) => {
    const selectPlayer = document.createElement('div');
    selectPlayer.id = 'select-player';
    getFirstPlayer(firstPlayer, selectPlayer);
    getSecondPlayer(secondPlayer, selectPlayer);
    document.getElementById('game-play').insertBefore(selectPlayer, document.getElementById('game-play').firstChild);
})(playerOne, playerTwo);

(createBoardOnScreen = (whereTo) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const spot = document.createElement('div');
            spot.classList = 'grid-spot'
            spot.dataset.column = `${[i]}`
            spot.dataset.row = `${[j]}`
            whereTo.appendChild(spot);
        }
    }
})(domBoard);

(findAvailableSpots = (board) => {
    let availableSpots = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                availableSpots.push(`${[i] + [j]}`)
            }
        }
    }
    return availableSpots
})(gameBoard);

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
    return winnerIs()
});


(gamePlay = (whereToLook, mainGameBoard, firstPlayer, secondPlayer) => {
    const grid = whereToLook.querySelectorAll('div');
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', e => {
            i = e.target.dataset.row;
            j = e.target.dataset.column;
            let playPosition = whereToLook.querySelector(`[data-row="${i}"][data-column="${j}"]`)
            let turn = checkTurn(firstPlayer, secondPlayer);
            playPosition.textContent = turn
            mainGameBoard[playPosition.dataset.row][playPosition.dataset.column] = playPosition.textContent;
            if (findAvailableSpots(mainGameBoard).length > 0) {
                console.log(secondPlayer.name)
                if (secondPlayer.name === 'Dumb Computer'||secondPlayer.name ==='Genius Computer') {
                    computerDumbPlays() 
                }
            }
            if (checkWinner(mainGameBoard) === 'X' || checkWinner(mainGameBoard) === 'O') {
                alert('winner is: ' + checkWinner(mainGameBoard));
                newGame(whereToLook, firstPlayer, secondPlayer)
            } else {
                if (findAvailableSpots(mainGameBoard).length == 0) {
                    alert('tie!');
                    newGame(whereToLook, firstPlayer, secondPlayer)
                }
            }

        },
            { once: true })
    }
})(domBoard, gameBoard, playerOne, playerTwo);


(newGame = (where, firstPlayer, secondPlayer) => {
    if (confirm('do you want to play again?')) location.reload()
    // gameBoard = [
    //     ['', '', ''],
    //     ['', '', ''],
    //     ['', '', ''],
    // ];

    // (removeOldBoard = (domBoard) => {
    //     while (domBoard.firstChild) {
    //         domBoard.removeChild(domBoard.firstChild);
    //     }
    // })(where);
    // createBoardOnScreen(where);
    // gamePlay(where, firstPlayer, secondPlayer);
});
(newGameBtn = () => {
    document.getElementById('new-game').addEventListener('click', e => newGame(board, playerOne, playerTwo))
})();


(computerDumbPlays = () => {
    const randomPosition = findAvailableSpots(gameBoard)[Math.floor(Math.random() * findAvailableSpots(gameBoard).length)]
    const i = randomPosition.charAt(0);
    const j = randomPosition.charAt(1);
    const gridPos = domBoard.querySelector(`[data-row="${i}"][data-column="${j}"]`)
    gridPos.textContent = checkTurn(playerOne, playerTwo);
    gameBoard[gridPos.dataset.row][gridPos.dataset.column] = gridPos.textContent;
});
