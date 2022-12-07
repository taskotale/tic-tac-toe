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
    let playerTurn = turn
    return {
        playerTurn: playerTurn,
        sign: sign,
        isTurn: () => this.playerTurn ? this.playerTurn = false : this.playerTurn = true
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
    const showGamePlay = document.getElementById('game-play');
    playerTwoHuman.addEventListener('click', e => playerTwoHumanSelection(selectPlayerTwo, playerTwoComputer, playerTwoHuman, secondPlayer, showGamePlay), { once: true });
    const playerTwoComputer = document.createElement('div');
    playerTwoComputer.textContent = 'COMPUTER';
    playerTwoComputer.addEventListener('click', e => playerTwoComputerSelection(selectPlayerTwo, playerTwoHuman, playerTwoComputer, secondPlayer, showGamePlay), { once: true });
    const startGameBtn = document.createElement('button')
    startGameBtn.id = 'start-button'
    startGameBtn.textContent = 'Start Game!'
    selectPlayerTwo.appendChild(playerTwoHuman);
    selectPlayerTwo.appendChild(playerTwoComputer);
    selectPlayerTwo.appendChild(startGameBtn);
    whereToAppend.appendChild(selectPlayerTwo);
});

(playerTwoHumanSelection = (parent, sibling, human, humanName, showNext) => {
    parent.removeChild(sibling);
    const playerTwoName = document.createElement('input');
    const submitNameBtn = document.createElement('button');
    submitNameBtn.textContent = 'Start Game'
    human.appendChild(playerTwoName);
    human.appendChild(submitNameBtn);
    playerTwoName.addEventListener('keyup', e => humanName.name = playerTwoName.value);
    document.querySelector('#start-button').addEventListener('click', e => startGameBtn(parent, showNext))
});

(playerTwoComputerSelection = (parent, sibling, computer, computerName, showNext) => {
    parent.removeChild(sibling);
    const compDumb = document.createElement('div');
    compDumb.textContent = 'Dumb Computer';
    const compGenius = document.createElement('div');
    compGenius.textContent = 'Genius Computer';
    computer.appendChild(compDumb);
    computer.appendChild(compGenius);
    compDumb.addEventListener('click', e => {
        computerName.name = compDumb.textContent;
        compDumb.classList = 'underlined';
        compGenius.classList.remove('underlined');
        computer.appendChild(compDumb);
        computer.appendChild(compGenius);
        console.log(computerName.name)
    })
    compGenius.addEventListener('click', e => {
        computerName.name = compGenius.textContent;
        compGenius.classList = 'underlined'
        compDumb.classList.remove('underlined');
        computer.appendChild(compDumb);
        computer.appendChild(compGenius);
        console.log(computerName.name)
    })
    document.querySelector('#start-button').addEventListener('click', e => startGameBtn(parent, showNext))

});

(startGameBtn = (removePlayerSelection, showGame) => {
    removePlayerSelection.parentElement.remove()
    showGame.classList.toggle('show-flex')
    showWhoIsPlaying(playerOne.name, showGame)
});

(createBoardOnScreen = (whereTo) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const spot = document.createElement('div');
            spot.classList = 'grid-spot'
            spot.dataset.row = `${[i]}`
            spot.dataset.column = `${[j]}`
            whereTo.appendChild(spot);
        }
    }
});

(startGame = (firstPlayer, secondPlayer, boardOnDom) => {
    const selectPlayer = document.createElement('div');
    selectPlayer.id = 'select-player';
    getFirstPlayer(firstPlayer, selectPlayer);
    getSecondPlayer(secondPlayer, selectPlayer);
    document.getElementById('body').insertBefore(selectPlayer, document.getElementById('game-play'));
    createBoardOnScreen(boardOnDom);
});

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
});

(checkTurn = (player, otherPlayer) => {
    if (player.isTurn()) {
        return player.sign
    }
    return otherPlayer.sign
});

(checkWinner = (board) => {
    let winner;
    areEqual = (a, b, c) => {
        return (a == b && b == c && a != '')
    }
    winnerIs = () => {
        if (findAvailableSpots(board).length === 0) {
            winner = 'tie'
        }
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
    startGame(firstPlayer, secondPlayer, whereToLook);
    const grid = whereToLook.querySelectorAll('div');
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', e => {
            if (e.target.textContent === '') {
                printPlay(e.target.dataset.row, e.target.dataset.column, firstPlayer, secondPlayer, whereToLook, mainGameBoard);
            } else return
            setTimeout(() => {
                if (findAvailableSpots(mainGameBoard).length > 0) {
                    const position = computerPlays(mainGameBoard, secondPlayer.name);
                    if (position) printPlay(position.charAt(0), position.charAt(1), firstPlayer, secondPlayer, whereToLook, mainGameBoard)
                }
            }, 3000)
            if (checkWinner(mainGameBoard) === 'X' || checkWinner(mainGameBoard) === 'O' || checkWinner(mainGameBoard) === 'tie') {
                showWhoIsPlaying(checkWinner(mainGameBoard), whereToLook, true, firstPlayer.name, secondPlayer.name)
            }
        })
    }
})(domBoard, gameBoard, playerOne, playerTwo);

(computerPlays = (mainGameBoard, computerName) => {
    if (computerName === 'Dumb Computer') {
        return findAvailableSpots(mainGameBoard)[Math.floor(Math.random() * findAvailableSpots(mainGameBoard).length)]
    }
    if (computerName === 'Genius Computer') {
        return geniusCompMove(mainGameBoard)
    }
});

(printPlay = (row, column, firstPlayer, secondPlayer, whereToLook, mainGameBoard) => {
    const gridPos = whereToLook.querySelector(`[data-row="${row}"][data-column="${column}"]`)
    gridPos.textContent = checkTurn(firstPlayer, secondPlayer)
    mainGameBoard[row][column] = gridPos.textContent;
    setTimeout(()=>{if (gridPos.textContent === 'X') {
        showWhoIsPlaying(secondPlayer.name, whereToLook)
    } else {
        showWhoIsPlaying(firstPlayer.name, whereToLook)
    }},1500)
});

(newGame = () => {
    if (confirm('do you want to play again?')) location.reload()
});

(newGameBtn = () => {
    document.getElementById('new-game-btn').addEventListener('click', e => newGame())
})();

(geniusCompMove = (board) => {
    let move;
    let count;
    (minimax = (tryBoard, maxi) => {
        let param = checkWinner(tryBoard)
        if (param === 'X') return -1;
        if (param === 'O') return 1;
        if (param === 'tie') return 0;
        if (maxi) {
            let topCount = -25000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (tryBoard[i][j] == '') {
                        tryBoard[i][j] = 'O';
                        let count = minimax(tryBoard, false);
                        tryBoard[i][j] = '';
                        if (count > topCount) {
                            topCount = count;
                        }
                    }
                }
            }
            return topCount
        } else {
            let topCount = 25000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (tryBoard[i][j] == '') {
                        tryBoard[i][j] = 'X';
                        let count = minimax(tryBoard, true);
                        tryBoard[i][j] = '';
                        if (count < topCount) {
                            topCount = count;
                        }
                    }
                }
            }
            return topCount
        }
    })
    let minimumCount = -25000
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = 'O';
                let count = minimax(board, false);
                board[i][j] = '';
                if (count > minimumCount) {
                    minimumCount = count;
                    move = `${i}${j}`
                }
            }
        }
    }
    return move
});

(showWhoIsPlaying = (currentPlayer, appendTo, check, onePlayerName, twoPlayerName) => {
    const displayMessage = document.createElement('div')
    displayMessage.textContent = '';
    displayMessage.id = 'display-message'
    if(!check) displayMessage.textContent = `It's ${currentPlayer}'s turn!`
    if(check) {
        currentPlayer === 'X'?displayMessage.textContent = `The winner is ${onePlayerName}`:
        currentPlayer === 'O'?displayMessage.textContent = `The winner is ${twoPlayerName}`:
        displayMessage.textContent = `It's a tie!`
    }
    console.log(displayMessage.textContent)
    appendTo.appendChild(displayMessage)
    if(!check) setTimeout(() => displayMessage.remove(), 1000);
});