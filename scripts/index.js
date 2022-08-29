console.log("JS IS WORKING")

const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'o'

const PLAYER_X_WON = 'PLAYER_X_WON'
const PLAYER_O_WON = 'PLAYER_O_WON'
const TIE = 'TIE'

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = Array.from(document.getElementsByClassName('cell'))
const playerDisplay = document.querySelector('.display-player')
const message = document.querySelector('.message')
const resetBtn = document.querySelector('#reset')


let board = ['','','','','','','','','']    // represents the state of the game board
let currentPlayer = 'X'                     // keep track of current player
let isGameActive = true                     // track if game is being played

// Function: Change Player
// Input: NA
// Description: Removes the current player class from display 
// We change players then re add said class to display to set
// up the proper styling and update the the inner text
const changePlayer = () => {
    playerDisplay.classList.remove(`${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'       // if currPlayer = X set to O else set to X
    playerDisplay.classList.add(`${currentPlayer}`)
    playerDisplay.innerText = currentPlayer
}

// Function: userAction
// Input: cell DOM object, board index
// Description: Checks if the chosen cell is available to be
// played on. Checks if game is active. If both conditions pass
// we insert an X or O into the cell text and then add the 
// curr players class to complete styling. The board is updated
// we check for a winner then change players
const userAction = (cell, index) => {
    if(isValidMove(cell) && isGameActive){
        cell.innerText = currentPlayer
        cell.classList.add(`${currentPlayer}`)
        updateBoard(index)
        checkForWin()
        changePlayer()
    }
}

// Function: Is Valid Move
// Description: Checks the given cell to see if the
// inner text contains either an X or an O. Players 
// cannot make a move on a cell already filled
const isValidMove = (cell) => {
    if(cell.innerText === 'X' || cell.innerText == 'O')
        return false
    return true
}

// Function: updateBoard
// Input: Index from cells array
// Description: Updates the board array at the given 
// index with the current player. This allows up to keep 
// track of the moves made
const updateBoard = (index) => {
    board[index] = currentPlayer
    console.log(board)
}

function checkForWin(){
    let roundWon = false        // initialize to false
    for(let i = 0; i < 8; i++){
        let winCondition = WINNING_COMBINATIONS[i]  // get 1 combo combos
        let a = board[winCondition[0]]  // get indexs from winnig combos list
        let b = board[winCondition[1]]
        let c = board[winCondition[2]]
        if(a === '' || b === '' || c === ''){   // not a win
            continue
        }
        if(a === b && b === c){     // winner if all ==
            roundWon = true
            break
        }
    }
    if (roundWon){      // if round is won announce current player
        announce(currentPlayer)
        isGameActive = false
        return
    }
    if(!board.includes('')) announce(TIE) // Tie if no winners
}

const announce = (type) => {
    console.log(type)
    switch(type){
        case 'X':
            message.innerHTML = 'Player <span class="display-player X">X</span> Won!'
            break
        case 'O':
            message.innerHTML = 'Player <span class="display-player O">O</span> Won!'
            break
        case TIE:
            message.innerHTML = 'Tie'
        default:
            console.log('Did not find a winner')
    }
    message.classList.remove('hide')
}

// Function: resetBoard
// Input: NA
// Description: Resets all game board data and hides the
// winners message. Switches current player back to X if
// not already X. Also removes all content and styles from
// game board cells
const resetBoard = () => {
    board = ['','','','','','','','','']
    isGameActive = true
    message.classList.add("hide")
    if(currentPlayer === 'O') changePlayer()
    cells.forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('X')
        cell.classList.remove('O')
    })
}

// EVENTS
for(let i = 0; i < cells.length; i++){
    const cell = cells[i]
    cell.addEventListener('click', () => userAction(cell, i))
}

resetBtn.addEventListener('click', resetBoard)
