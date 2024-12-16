export default function GameOver({ winner, rematch }) {
    return (
      <div id="game-over">
        <h2>Гру закінчено!</h2>
        <p>{winner ? `${winner} виграв (ла)!` : "Нічия!"}</p>
        <p>
          <button onClick={rematch}>Rematch!</button>
        </p>
      </div>
    );
  }
  