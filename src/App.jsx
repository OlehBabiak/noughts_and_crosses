import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNing_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const players = [
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ];

  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    [players[0].symbol]: players[0].name,
    [players[1].symbol]: players[1].name,
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((el) => [...el])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;

  for (const combination of WINNing_COMBINATIONS) {
    const firstSqareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSqareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSqareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (
      firstSqareSymbol &&
      firstSqareSymbol === secondSqareSymbol &&
      firstSqareSymbol === thirdSqareSymbol
    ) {
      winner = playerNames[firstSqareSymbol];
    }
  }

  function handlePlayerChange(player, symbol) {
    setPlayerNames((prev) => ({
      ...prev,
      [symbol]: player,
    }));
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRematch() {
    setGameTurns([]);
  }

  function handleSelectFunction(row, col) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            {players.map(({ name, symbol }, i) => (
              <Player
                key={name + i}
                name={name}
                symbol={symbol}
                isActive={symbol === activePlayer ? true : false}
                onPlayerChange={handlePlayerChange}
              />
            ))}
          </ol>
          {winner || hasDraw ? (
            <GameOver winner={winner} rematch={handleRematch} />
          ) : (
            <GameBoard
              board={gameBoard}
              onChangePlayer={handleSelectFunction}
            />
          )}
        </div>
        <Log gameTurns={gameTurns} />
      </main>
    </>
  );
}

export default App;
