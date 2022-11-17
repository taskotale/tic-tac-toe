let board = [
    ['','','O'],
    ['','X',''],
    ['','X','O']
];

let players = ['X','O'];

function setup () {
    createCanvas(400,400);

}

let gameBoard = [
    ['a', '1', 'd'],
    ['f', '2', 'c'],
    ['5', 'g', 'h'],
];
function draw() {
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            console.log(gameBoard[i][j])
        }
    }
}
draw()
