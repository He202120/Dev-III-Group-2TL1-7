import React from "react";
import Position from "../composition/position";
import "./4231style.css";
function Formation4231() {
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
    <div className="formation4231">
      <div className="attackLane4231">
        <Position playerName={players[0]} />
      </div>
      <div className="midLaneFront4231">
        <Position playerName={players[1]} />
        <Position playerName={players[2]} />
        <Position playerName={players[3]} />
      </div>
      <div className="midLaneBack4231">
        <Position playerName={players[4]} />
        <Position playerName={players[5]} />
      </div>
      <div className="backLane4231">
        <Position playerName={players[6]} />
        <Position playerName={players[7]} />
        <Position playerName={players[8]} />
        <Position playerName={players[9]} />
      </div>
      <div className="gkLane4231">
        <Position playerName={players[10]} />
      </div>
    </div>
  );
}

export default Formation4231;
