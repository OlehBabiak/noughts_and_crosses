export default function Log({ gameTurns }) {
    return (
      <ol id="log">
        {gameTurns.map(({ player, square }) => {
          return (
            <li key={`${square.row}${square.col}`}>
              {player} selected {square.row + 1},{square.col + 1}
            </li>
          );
        })}
      </ol>
    );
  }
  