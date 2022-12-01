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
            spot.id = `${[i]}`;
            spot.classList = `${[j]}`;
            spot.dataset = `${[i]}${[j]}`
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


(gamePlay = (whereToLook, mainGameBoard, ...players) => {
    const grid = whereToLook.querySelectorAll('div');
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', e => {
            let playPosition = e.target;
            playPosition.textContent = checkTurn(players[0], players[1]);
            mainGameBoard[playPosition.id][playPosition.classList] = playPosition.textContent;
            if (checkWinner(mainGameBoard) === 'X' || checkWinner(mainGameBoard) === 'O') {
                alert('winner is: ' + checkWinner(mainGameBoard));
                newGame(whereToLook, players[0], players[1])
            } else {
                if (findAvailableSpots(mainGameBoard).length == 0) {
                    alert('tie!');
                    newGame(whereToLook, players[0], players[1])
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
    console.log(randomPosition)
    console.log('pos 1:' + i)
    console.log('pos 2:' + j)
    const gridPos = document.querySelector(`#${}.${}`)
    console.log('hey ' + gridPos)
    console.log(typeof (gridPos))
    console.log(gridPos)
        ;
    // gameBoard[randomPosition.id][randomPosition.classList] = playerTwo.sign;
});
// (gamePlay = (whereToLook, mainGameBoard, ...players) => {
//     const grid = whereToLook.querySelectorAll('div');
//     for (let i = 0; i < grid.length; i++) {
//         grid[i].addEventListener('click', e => {
//             let playPosition = e.target;
//             playPosition.textContent = checkTurn(players[0], players[1]);
//             mainGameBoard[playPosition.id][playPosition.classList] = playPosition.textContent;
//             if (checkWinner(mainGameBoard) === 'X' || checkWinner(mainGameBoard) === 'O') {
//                 alert('winner is: ' + checkWinner(mainGameBoard));
//                 newGame(whereToLook, players[0], players[1])
//             } else {
//                 if (findAvailableSpots(mainGameBoard).length == 0) {
//                     alert('tie!');
//                     newGame(whereToLook, players[0], players[1])
//                 }
//             }
//         },
//             { once: true })
//     }
// })(domBoard, gameBoard, playerOne, playerTwo);