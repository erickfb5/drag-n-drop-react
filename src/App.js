import { useState } from "react";

import "./App.css";

function App() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("invisible");
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove("invisible");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("hovered");
  };

  const handleDragLeave = (e) => e.target.classList.remove("hovered");

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    e.target.appendChild(draggedElement);
    e.target.classList.remove("hovered");
  };

  return (
    <div>
      <div
        id="fill"
        className={isDragging ? "fill hold" : "fill"}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      ></div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="empty"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></div>
      ))}
    </div>
  );
}

export default App;
