let moves = ['rock', 'paper', 'scissors']

let randomMove = () => {
  console.log(`randomMove()`)
  let random = Math.random() * moves.length
  random = Math.floor(random)
  let move = moves[random]
  return move
}

let score = {
  me: 0,
  computer: 0
}

let determineMatch = (score) => {
  console.log(`determineMatch() --`)
  console.log(gameMode)
  console.log(score)
  let totalPoints = score.me + score.computer
  console.log(totalPoints)
  if(gameMode == 'one' && totalPoints == 1) {
    console.log(`gameMode is one`)
    console.log(`time to end game!`)
    if(score.me > score.computer) {
      $('#results').html(`<h2>Congrats! You won!</h2>`)
    }
    $('#buttons button').not('#playAgain').prop('disabled', true)
    $('#playAgain').addClass('d-inline-block')
    
  } else if(gameMode == 'three' && totalPoints == 3) {
    console.log(`gameMode is three`)
    console.log(`time to end game`)
    if(score.me > score.computer) {
      $('#results').html(`<h2>Congrats! You won!</h2>`)
    }
    $('#buttons button').not('#playAgain').prop('disabled', true)
    $('#playAgain').addClass('d-inline-block')

  }
}

let playAgain = () => {
  console.log(`playAgain() --`)
  score.me = 0
  score.computer = 0
  console.log(score)
  updateScoreboard(score)
  // reset all game elements
  $('#buttons button').prop('disabled', false)
  $('#playAgain').removeClass('d-inline-block')
  $('#winner span').html('&nbsp;')
  $('#results').html('&nbsp;')
  $('#me').find('*').removeClass('active')
  $('#computer').find('*').removeClass('active')
}

$('#playAgain').on('click', playAgain)

let updateScoreboard = (score) => {
  console.log(`updateScoreboard (${score.me}, ${score.computer})`)
  $('#scoreboard .me').text(score.me)
  $('#scoreboard .computer').text(score.computer)
}

let determineGame = (move1, move2) => {
  console.log(`determineGame(${move1}, ${move2})`)
  let moves = [move1, move2]
  console.log(moves)
  console.log(JSON.stringify(moves))
  
  let test = 2

  // determine winner
  let winner = undefined
  switch(true) {
    case move1 == 'rock' && move2 == 'rock':
      console.log(`'rock v rock: tie`)
      winner = 'tie'
      break
    case move1 == 'rock' && move2 == 'paper':
      console.log(`'rock v paper: I lose`)
      winner = 'computer'
      break
    case move1 == 'rock' && move2 == 'scissors':
      console.log(`'rock v scissors: I win`)
      winner = 'me'
      break
    case move1 == 'paper' && move2 == 'rock':
      console.log(`'paper v rock: I win`)
      winner = 'me'
      break
    case move1 == 'paper' && move2 == 'paper':
      console.log(`'paper v paper: tie`)
      winner = 'tie'
      break
    case move1 == 'paper' && move2 == 'scissors':
      console.log(`'paper v scissors: I lose`)
      winner = 'computer'
      break
    case move1 == 'scissors' && move2 == 'rock':
      console.log(`'scissors v rock: I lose`)
      winner = 'computer'
      break
    case move1 == 'scissors' && move2 == 'paper':
      console.log(`'scissors v paper: I win`)
      winner = 'me'
      break
    case move1 == 'scissors' && move2 == 'scissors':
      console.log(`'scissors v scissors: tie`)
      winner = 'tie'
      break
  }

  console.log(`winner: ${winner}`)

  let winnerText = ''
  switch(true) {
    case winner == 'me':
      winnerText = 'You win'
      score.me ++
      break
    case winner == 'computer':
      winnerText = 'You lose'
      score.computer ++
      break
    case winner == 'tie':
      winnerText = 'It\'s a tie'
  }

  console.log(score)
  updateScoreboard(score)

  $('#winner span').html(winnerText)
}

let moveClick = (obj) => {
  console.log(`button click`)
  console.log(obj)
  let move = obj.attr('id')
  console.log(move)
  $('#me').find('*').removeClass('active')
  $('#me .'+ move).addClass('active')
  let computerMove = randomMove()
  console.log(computerMove)
  $('#computer').find('*').removeClass('active')
  $('#computer .' + computerMove).addClass('active')
  determineGame(move, computerMove)
  determineMatch(score)
}

$('.btn').not('#playAgain').on('click', function() {
  moveClick($(this))
})

let playGame = (gameMode) => {
  console.log(`playGame: ${gameMode}`)
  switch(true) {
    case gameMode == 'one':
      console.log(`single game`)
      break
    case gameMode == 'three':
      console.log(`best of three`)
      break
  }
}

let gameMode = undefined
$('#gamemode input').on('click', function() {
  gameMode = $(this).attr('id')
  console.log(gameMode)
  $('#gameboard').removeClass('d-none')
  $('#gamemode').addClass('d-none')
  playGame(gameMode)
})