import React, { useState } from "react";
import Playerpoolcandidate from "./playerpoolcanditate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import profile from "../../assets/cards/maillot.png";
import { players } from "./players";

function Playerpool(props) {
  const [availableplayers, setPlayers] = useState(players);

  const playerpool = availableplayers.map(function (player, index) {
    return (
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable
              draggableId={player.id.toString()}
              key={player.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  className="playerpoolcandidate"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <img src={player.image} alt="profile" />
                </div>
              )}
            </Draggable>
            <div style={{ visibility: "hidden", height: 0 }}>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
  }
  return (
    <div className="playerpool">
      <div className="playerpoolcontent">{playerpool}</div>
    </div>
  );
}

export default Playerpool;
