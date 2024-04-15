import React from "react";
import Position from "../composition/position";
import "./352style.css";
function Formation352() {
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
    <div className="formation352">
      <div className="attackLane352">
        <Position playerName={players[0]} />
        <Position playerName={players[1]} />
      </div>
      <div className="midLane352">
        <Position playerName={players[2]} />
        <Position playerName={players[3]} />
        <Position playerName={players[4]} />
        <Position playerName={players[5]} />
        <Position playerName={players[6]} />
      </div>
      <div className="backLane352">
        <Position playerName={players[7]} />
        <Position playerName={players[8]} />
        <Position playerName={players[9]} />
      </div>
      <div className="gkLane352">
        <Position playerName={players[10]} />
      </div>
    </div>
  );
}

export default Formation352;
