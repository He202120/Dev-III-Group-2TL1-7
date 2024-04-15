import React from "react";
import Position from "../composition/position";
import "./451style.css";
function Formation451() {
  const players = [
    "player1",
    "player2",
    "player3",
    "player4",
    "player5",
    "player6",
    "player7",
    "player8",
    "player9",
    "player10",
    "player11"
  ];
  return (
    <div className="formation451">
      <div className="attackLane451">
        <Position playerName={players[0]} />
      </div>
      <div className="midLane451">
        <Position playerName={players[1]} />
        <Position playerName={players[2]} />
        <Position playerName={players[3]} />
        <Position playerName={players[4]} />
        <Position playerName={players[5]} />
      </div>
      <div className="backLane451">
        <Position playerName={players[6]} />
        <Position playerName={players[7]} />
        <Position playerName={players[8]} />
        <Position playerName={players[9]} />
      </div>
      <div className="gkLane451">
        <Position playerName={players[10]} />
      </div>
    </div>
  );
}

export default Formation451;
