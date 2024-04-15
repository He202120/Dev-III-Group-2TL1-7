import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Box } from "./Box";
import { Dustbin } from "./Dustbin";
import { ItemTypes } from "./ItemTypes";
export const Container = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.ATTAQUANT], lastDroppedItem: null },
    { accepts: [ItemTypes.ATTAQUANT], lastDroppedItem: null },
    { accepts: [ItemTypes.DEFENSEUR],lastDroppedItem: null },
    { accepts: [ItemTypes.GARDIEN], lastDroppedItem: null },
  ]);
  const [boxes] = useState([
    { name: "Messi", type: ItemTypes.ATTAQUANT },
    { name: "Ronaldo", type: ItemTypes.ATTAQUANT },
    { name: "Lukaku", type: ItemTypes.DEFENSEUR },
    { name: "Courtoi", type: ItemTypes.GARDIEN },
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedBoxNames, dustbins]
  );
  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});
