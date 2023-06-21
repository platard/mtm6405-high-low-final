function Wins ({wins}) {
  return (
    <h2 className="text-center">
      {wins}<br />
      Wins
    </h2>
  )
}

function Loses ({loses}) {
  return (
    <h2 className="text-center">
      {loses}<br />
      Loses
    </h2>
  )
}

function PlayButton (props) {
  function clickHandler () {
    props.onPlayGame()
  }
  return (<button className="btn btn-primary" onClick={clickHandler}>Play</button>)
}

function Response ({message}) {
  return (<div className="alert alert-info">{message}</div>)
}

function GuessForm ({guess, min, max, onGuessChange, onGuess}) {

  function submitHandler (e) {
    e.preventDefault()
    onGuess()
  }

  return (
    <form onSubmit={submitHandler}>
      <input  type="number"
              className="form-control mb-3" 
              min={min} 
              max={max}
              value={guess}
              onChange={(e) => onGuessChange(e)} />
      <button type="submit" className="btn btn-primary">Guess</button>
    </form>
  )
}

function App () {
  const min = 1
  const max = 10
  const maxGuesses = 3

  const [active, setActive] = React.useState(false)
  const [number, setNumber] = React.useState(0)
  const [guesses, setGuesses] = React.useState(0)
  const [wins, setWins] = React.useState(0)
  const [loses, setLoses] = React.useState(0)
  const [guess, setGuess] = React.useState('')
  const [message, setMessage] = React.useState('')

  function playGame () {
    setActive(true)
    setMessage(`Guess a number between ${min} and ${max}.`)
    setGuesses(0)
    setNumber(Math.floor(Math.random() * max) + min)
  }

  function onGuessChangeHandler(e) {
    setGuess(e.target.value)
  }

  function verifyGuess () {
    if (number == guess) {
      setWins(wins + 1)
      setMessage('You guessed the number!')
      endGame()
    } else {   
      console.log("outside the equals")
      if (guesses < maxGuesses) {
        if (guess < number) {
          setGuesses(guesses + 1)
          setMessage(`Your guess was too low. Guesses remaining: ${maxGuesses - guesses}.`)
        } else {
          setGuesses(guesses + 1)
          setMessage(`Your guess was too high. Guesses remaining: ${maxGuesses - guesses}.`)
        }
      } else {
        setMessage(`Sorry you are out of guesses. The number was ${number}.`)
        setLoses(loses + 1)
        endGame()
      }
    }
  }

  function endGame () {
    setGuess('')
    setNumber(0)
    setTimeout(() => setActive(false), 3000)
  }

  return (
    <React.Fragment>
      <div className="row mb-5">
        <div className="col col-12">
          <h1 className="display-4 mb-5 text-center my-3">
            High Low
          </h1>
        </div>
        <div className="col col-6">
          <Wins wins={wins} />
        </div>
        <div className="col col-6">
          <Loses loses={loses} />
        </div>
      </div>
      <div className="row d-grid">
        {
          active ?
            (<div className="col col-6 offset-3 grid-column-1 grid-row-1">
              <Response message={message} />
              <GuessForm guess={guess} min={min} max={max} onGuessChange={onGuessChangeHandler} onGuess={verifyGuess} />
            </div>)
            :
            (<div className="col col-6 offset-3 text-center grid-column-1 grid-row-1"> 
            <PlayButton onPlayGame={playGame} />     
            </div>)
        }
      </div>   
    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)