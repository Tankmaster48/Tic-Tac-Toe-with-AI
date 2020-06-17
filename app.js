const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
let moves = 0

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
  moves = 0
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  moves = moves+1
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    runAI()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function runAI() {
  if(circleTurn === true) {
    let availableMoves = []
    for(let i = 0; i < 9; i++) {
      if((cellElements[i].classList.contains('x')) || (cellElements[i].classList.contains('circle'))) {
        
      } else {
        availableMoves.push(i)
      }
    }

    if((moves === 1 && cellElements[0].classList.contains('x')) || (moves === 1 && cellElements[2].classList.contains('x')) || (moves === 1 && cellElements[6].classList.contains('x')) || (moves === 1 && cellElements[8].classList.contains('x'))) {
      cellElements[4].click()
      // Now it checks if it has any spots it can win with
    } else if(cellElements[0].classList.contains('circle') && cellElements[1].classList.contains('circle') && cellElements[2].classList.contains('x') === false) {
      cellElements[2].click()
    } else if(cellElements[0].classList.contains('circle') && cellElements[2].classList.contains('circle') && cellElements[1].classList.contains('x') === false) {
    cellElements[1].click()
    } else if(cellElements[1].classList.contains('circle') && cellElements[2].classList.contains('circle') && cellElements[0].classList.contains('x') === false) {
    cellElements[0].click()
    } else if(cellElements[3].classList.contains('circle') && cellElements[4].classList.contains('circle') && cellElements[5].classList.contains('x') === false) {
    cellElements[5].click()
    } else if(cellElements[3].classList.contains('circle') && cellElements[5].classList.contains('circle') && cellElements[4].classList.contains('x') === false) {
    cellElements[1].click()
    } else if(cellElements[4].classList.contains('circle') && cellElements[5].classList.contains('circle') && cellElements[3].classList.contains('x') === false) {
    cellElements[3].click()
    } else if(cellElements[6].classList.contains('circle') && cellElements[7].classList.contains('circle') && cellElements[8].classList.contains('x') === false) {
    cellElements[8].click()
    } else if(cellElements[6].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[7].classList.contains('x') === false) {
    cellElements[7].click()
    } else if(cellElements[7].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[6].classList.contains('x') === false) {
    cellElements[6].click()
    } else if(cellElements[0].classList.contains('circle') && cellElements[3].classList.contains('xcircle') && cellElements[6].classList.contains('x') === false) {
    cellElements[6].click()
    } else if(cellElements[0].classList.contains('circle') && cellElements[6].classList.contains('circle') && cellElements[3].classList.contains('x') === false) {
    cellElements[3].click()
    } else if(cellElements[3].classList.contains('circle') && cellElements[6].classList.contains('circle') && cellElements[0].classList.contains('x') === false) {
    cellElements[0].click()
    } else if(cellElements[1].classList.contains('circle') && cellElements[4].classList.contains('circle') && cellElements[7].classList.contains('x') === false) {
    cellElements[7].click()
    } else if(cellElements[1].classList.contains('circle') && cellElements[7].classList.contains('circle') && cellElements[4].classList.contains('x') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('circle') && cellElements[7].classList.contains('circle') && cellElements[1].classList.contains('x') === false) {
    cellElements[1].click()
    } else if(cellElements[2].classList.contains('circle') && cellElements[5].classList.contains('circle') && cellElements[8].classList.contains('x') === false) {
    cellElements[8].click()
    } else if(cellElements[2].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[5].classList.contains('x') === false) {
    cellElements[5].click()
    } else if(cellElements[5].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[2].classList.contains('x') === false) {
    cellElements[2].click()
    } else if(cellElements[0].classList.contains('circle') && cellElements[4].classList.contains('circle') && cellElements[8].classList.contains('x') === false) {
    cellElements[8].click()
    } else if(cellElements[0].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[4].classList.contains('x') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('circle') && cellElements[8].classList.contains('circle') && cellElements[0].classList.contains('x') === false) {
    cellElements[0].click()
    } else if(cellElements[2].classList.contains('circle') && cellElements[4].classList.contains('circle') && cellElements[1].classList.contains('x') === false) {
    cellElements[6].click()
    } else if(cellElements[2].classList.contains('circle') && cellElements[6].classList.contains('circle') && cellElements[4].classList.contains('x') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('circle') && cellElements[6].classList.contains('circle') && cellElements[2].classList.contains('x') === false) {
    cellElements[2].click()
    // Now it starts checking if the enemy can win and tries to block it
    } else if(cellElements[0].classList.contains('x') && cellElements[1].classList.contains('x') && cellElements[2].classList.contains('circle') === false) {
    cellElements[2].click()
    } else if(cellElements[0].classList.contains('x') && cellElements[2].classList.contains('x') && cellElements[1].classList.contains('circle') === false) {
    cellElements[1].click()
    } else if(cellElements[1].classList.contains('x') && cellElements[2].classList.contains('x') && cellElements[0].classList.contains('circle') === false) {
    cellElements[0].click()
    } else if(cellElements[3].classList.contains('x') && cellElements[4].classList.contains('x') && cellElements[5].classList.contains('circle') === false) {
    cellElements[5].click()
    } else if(cellElements[3].classList.contains('x') && cellElements[5].classList.contains('x') && cellElements[4].classList.contains('circle') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('x') && cellElements[5].classList.contains('x') && cellElements[3].classList.contains('circle') === false) {
    cellElements[3].click()
    } else if(cellElements[6].classList.contains('x') && cellElements[7].classList.contains('x') && cellElements[8].classList.contains('circle') === false) {
    cellElements[8].click()
    } else if(cellElements[6].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[7].classList.contains('circle') === false) {
    cellElements[7].click()
    } else if(cellElements[7].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[6].classList.contains('circle') === false) {
    cellElements[6].click()
    } else if(cellElements[0].classList.contains('x') && cellElements[3].classList.contains('x') && cellElements[6].classList.contains('circle') === false) {
    cellElements[6].click()
    } else if(cellElements[0].classList.contains('x') && cellElements[6].classList.contains('x') && cellElements[3].classList.contains('circle') === false) {
    cellElements[3].click()
    } else if(cellElements[3].classList.contains('x') && cellElements[6].classList.contains('x') && cellElements[0].classList.contains('circle') === false) {
    cellElements[0].click()
    } else if(cellElements[1].classList.contains('x') && cellElements[4].classList.contains('x') && cellElements[7].classList.contains('circle') === false) {
    cellElements[7].click()
    } else if(cellElements[1].classList.contains('x') && cellElements[7].classList.contains('x') && cellElements[4].classList.contains('circle') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('x') && cellElements[7].classList.contains('x') && cellElements[1].classList.contains('circle') === false) {
    cellElements[1].click()
    } else if(cellElements[2].classList.contains('x') && cellElements[5].classList.contains('x') && cellElements[8].classList.contains('circle') === false) {
    cellElements[8].click()
    } else if(cellElements[2].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[5].classList.contains('circle') === false) {
    cellElements[5].click()
    } else if(cellElements[5].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[2].classList.contains('circle') === false) {
    cellElements[2].click()
    } else if(cellElements[0].classList.contains('x') && cellElements[4].classList.contains('x') && cellElements[8].classList.contains('circle') === false) {
    cellElements[8].click()
    } else if(cellElements[0].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[4].classList.contains('circle') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('x') && cellElements[8].classList.contains('x') && cellElements[0].classList.contains('circle') === false) {
    cellElements[0].click()
    } else if(cellElements[2].classList.contains('x') && cellElements[4].classList.contains('x') && cellElements[1].classList.contains('circle') === false) {
    cellElements[6].click()
    } else if(cellElements[2].classList.contains('x') && cellElements[6].classList.contains('x') && cellElements[4].classList.contains('circle') === false) {
    cellElements[4].click()
    } else if(cellElements[4].classList.contains('x') && cellElements[6].classList.contains('x') && cellElements[2].classList.contains('circle') === false) {
    cellElements[2].click()
    } else {
    cellElements[availableMoves[Math.floor(Math.random()*availableMoves.length)]].click()
    }
    }
  }
