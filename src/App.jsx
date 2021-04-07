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
    }
  ]);
  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = boxes.find(box => box.id === dragId);
    const dropBox = boxes.find(box => box.id === ev.currentTarget.id);

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = boxes.map(box => {
      if (box.id === dragId) {
        box.order = dropBoxOrder;
      }
      if (box.id === ev.currentTarget.id) {
        box.order = dragBoxOrder;
      }
      return box;
    });

    setBoxes(newBoxState);
  };

  // https://dev.to/colinmcd01/drag-drop-re-ordering-using-html-and-react-974

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
