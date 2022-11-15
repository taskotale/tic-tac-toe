(gameBoardGrid = () => {
    let grid = [];
    (getGrid = () => {
        grid = document.querySelector('.board')
    })()
    return grid
})()

const player = (sign) => {
    const name = sign
    return {
        sayName: () => console.log('Player: '+ name),
    }
}

const playerOne = player('X');
const playerTwo = player('O');

(renderPlay = () => {
    gameBoardGrid().addEventListener('click', e=> {
        let playPosition = e.target
        playPosition.textContent = 'x'
    })
})()
