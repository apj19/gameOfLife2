import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Text, Line } from "react-konva";
import type { Stage as KonvaStage } from "konva/lib/Stage";
import type { KonvaEventObject } from "konva/lib/Node";

function Canvas() {
  //setting convas size

  const [dimension, setDimension] = useState({
    width: Math.floor(window.innerWidth * 0.9),
    height: Math.floor(window.innerHeight * 0.7),
  });

  useEffect(() => {
    function handelResize() {
      setDimension({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.7,
      });
    }

    window.addEventListener("resize", handelResize);

    return () => window.removeEventListener("resize", handelResize);
  }, []);

  const vertivalLines: number[] = [];
  const horizontalLines: number[] = [];
  const GRID_SIZE = 20;

  for (let i = 0; i < Math.floor(dimension.width); i = i + GRID_SIZE) {
    vertivalLines.push(i);
  }

  for (let i = 0; i < Math.floor(dimension.height); i += GRID_SIZE) {
    horizontalLines.push(i);
  }

  //handle click on canvas

  function handleClick(e: KonvaEventObject<MouseEvent>) {
    const stage = e.target.getStage();
    const pointerPos = stage!.getPointerPosition();
    if (!pointerPos) return;

    const x = Math.floor(pointerPos.x / GRID_SIZE);
    const y = Math.floor(pointerPos.y / GRID_SIZE);

    console.log(pointerPos, x, y);
  }

  return (
    <>
      {/* <canvas ref={canvasRef} className="w-full h-[75vh] border-2" /> */}
      <Stage
        width={dimension.width}
        height={dimension.height}
        className="p-4 border "
        onClick={handleClick}
      >
        <Layer>
          {/* <Circle
            x={0}
            y={0}
            radius={100}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />
          <Circle
            x={dimension.width}
            y={0}
            radius={100}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />

          <Circle
            x={dimension.width}
            y={dimension.height}
            radius={100}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />
          <Circle
            x={0}
            y={dimension.height}
            radius={100}
            fill="red"
            stroke="black"
            strokeWidth={4}
          /> */}

          {/* <Line
            points={[100, 100, 200, 100]}
            stroke="green"
            strokeWidth={15}
            lineCap="round"
            lineJoin="round"
          /> */}

          {vertivalLines.map((x) => (
            <Line
              points={[x, 0, x, dimension.height]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))}

          {horizontalLines.map((y) => (
            <Line
              points={[0, y, dimension.width, y]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
