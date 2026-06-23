import { useEffect, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";

function Canvas() {
  //setting convas size

  const [dimension, setDimension] = useState({
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight * 0.7),
  });
  //stroing clicked cells
  const [aliveCells, setAliveCells] = useState<Set<string>>(new Set());

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
    // console.log(pointerPos, x, y);

    let tesmpSet = new Set<string>(aliveCells);
    tesmpSet.add(`${x},${y}`);
    setAliveCells(tesmpSet);
  }

  return (
    <>
      {/* <canvas ref={canvasRef} className="w-full h-[75vh] border-2" /> */}
      <Stage
        width={dimension.width}
        height={dimension.height}
        className="border"
        onClick={handleClick}
      >
        <Layer>
          {vertivalLines.map((x, i) => (
            <Line
              key={`v-${i}`}
              points={[x, 0, x, dimension.height]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))}

          {horizontalLines.map((y, j) => (
            <Line
              key={`h-${j}`}
              points={[0, y, dimension.width, y]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))}
        </Layer>
        <Layer>
          {/* <Rect
            x={20}
            y={20}
            width={20}
            height={20}
            stroke="green"
            fill="green"
            strokeWidth={1}
          /> */}

          {[...aliveCells].map((c, i) => {
            const [xPos, yPos] = c.split(",").map((e) => Number(e));

            return (
              <Rect
                key={`c-${i}`}
                x={xPos * 20}
                y={yPos * 20}
                width={20}
                height={20}
                stroke="green"
                fill="green"
                strokeWidth={1}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
