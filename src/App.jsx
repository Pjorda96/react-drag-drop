import React, { useState } from "react";
import Box from "./Box";
import "./index.css";

const App = () => {
  const [boxes, setBoxes] = useState([
    {
      id: "Box-1",
      color: "red",
      order: 1
    },
    {
      id: "Box-2",
      color: "green",
      order: 2
    },
    {
      id: "Box-3",
      color: "blue",
      order: 3
    },
    {
      id: "Box-4",
      color: "orange",
      order: 4
    },
    {
      id: "Box-5",
      color: "fuchsia",
      order: 5
    }
  ]);
  const [dragId, setDragId] = useState(null);

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = boxes.find(box => box.id === dragId);
    const dropBox = boxes.find(box => box.id === ev.currentTarget.id);

    // indexOf with no order property
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = boxes.map(box => {
      if (box.id === dragId) {
        return {
          ...box,
          order: dropBoxOrder, // splice if no order property
        };
      } else if (
        dragBoxOrder > dropBoxOrder // if move it to up change between drop to drag
        && box.order >= dropBoxOrder // greater or equal than drop
        && box.order < dragBoxOrder // lower than drag (drag handled first)
      ) {
        return {
          ...box,
          order: box.order + 1,
        }
      } else if (
        dragBoxOrder < dropBoxOrder // if move it to down change between drag to drop
        && box.order > dragBoxOrder // greater than drag (drag handled first)
        && box.order <= dropBoxOrder // lower or equal than drop
      ) {
        return {
          ...box,
          order: box.order - 1,
        }
      }

      /*if (box.id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box.id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }*/

      return box;
    });

    setBoxes(newBoxState);
  };

  return (
    <div className="App">
      {boxes
        .sort((a, b) => a.order - b.order)
        .map((box) => (
          <Box
            key={box.id}
            boxColor={box.color}
            boxNumber={box.id}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
        ))}
    </div>
  );
}

export default App;
