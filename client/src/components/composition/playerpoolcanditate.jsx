import React from "react";

function Playerpoolcandidate(props) {
  const player = props.player;

  return (
    <div className="playerpoolcandidate" ref={props.innerRef}>
      <img src={player.image} alt="profile" />
    </div>
  );
}

export default Playerpoolcandidate;
