import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
// import { nextGeneration } from "@/lib/gameRules";
import Konva from "konva";
import { useCellStore } from "@/store/cellStore";

interface grid {
  vLines: number[];
  hLines: number[];
}

function Canvas() {
  //seeting convas dynamic size as per views
  const [dimension, setDimension] = useState({
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight * 0.7),
  });

  const { aliveCells, addAliveCell } = useCellStore();

  //saving grid for anning and zooig in state
  const [gridCordinates, setGridCordinates] = useState<grid>({
    vLines: [],
    hLines: [],
  });

  const layerRef = useRef<Konva.Layer>(null);

  //updating grid for conavs as per size
  useEffect(() => {
    drawGrid();
    function handelResize() {
      setDimension({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.7,
      });
    }

    window.addEventListener("resize", handelResize);

    return () => window.removeEventListener("resize", handelResize);
  }, []);

  // const vertivalLines: number[] = [];
  // const horizontalLines: number[] = [];
  const GRID_SIZE = 20;

  // for (let i = 0; i < Math.floor(dimension.width); i = i + GRID_SIZE) {
  //   vertivalLines.push(i);
  // }

  // for (let i = 0; i < Math.floor(dimension.height); i += GRID_SIZE) {
  //   horizontalLines.push(i);
  // }

  function drawGrid(stageX: number = 0, stageY: number = 0) {
    const layer = layerRef.current;
    if (!layer) return;

    layer.destroyChildren();

    // const vertivalLines: number[] = [];
    // const horizontalLines: number[] = [];

    // for (
    //   let i = -stageX;
    //   i < Math.floor(dimension.width) - stageX;
    //   i = i + GRID_SIZE
    // ) {
    //   vertivalLines.push(i);
    // }

    // for (
    //   let i = -stageY;
    //   i < Math.floor(dimension.height) - stageY;
    //   i = i + GRID_SIZE
    // ) {
    //   horizontalLines.push(i);
    // }

    // setGridCordinates({ vLines: vertivalLines, hLines: horizontalLines });

    // const offsetX = ((stageX % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    // const offsetY = ((stageY % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
    let deX = -stageX;
    let dey = -stageY;

    // Draw vertical lines directly onto layer
    for (let x = -stageX; x < dimension.width - stageX; x += GRID_SIZE) {
      const line = new Konva.Line({
        points: [x, dey, x, dimension.height],
        stroke: "#ddd",
        strokeWidth: 1,
      });
      layer.add(line);
    }

    // Draw horizontal lines directly onto layer
    for (let y = -stageY; y < dimension.height - stageY; y += GRID_SIZE) {
      const line = new Konva.Line({
        points: [deX, y, dimension.width, y],
        stroke: "#ddd",
        strokeWidth: 1,
      });
      layer.add(line);
    }

    layer.batchDraw();
  }

  //handle click on canvas,add alive cell
  function handleClick(e: KonvaEventObject<MouseEvent>) {
    const stage = e.target.getStage();
    const pointerPos = stage!.getPointerPosition();
    if (!pointerPos) return;

    const x = Math.floor(pointerPos.x / GRID_SIZE);
    const y = Math.floor(pointerPos.y / GRID_SIZE);
    // console.log(pointerPos, x, y);

    let tesmpSet = new Set<string>(aliveCells);
    tesmpSet.add(`${x},${y}`);
    // setAliveCells(tesmpSet);
    addAliveCell(tesmpSet);
  }

  return (
    <>
      {/* <canvas ref={canvasRef} className="w-full h-[75vh] border-2" /> */}
      <Stage
        width={dimension.width}
        height={dimension.height}
        className="border"
        onClick={handleClick}
        draggable // ← that's it
        onDragEnd={(e) => {
          // optionally save position to state
          let stageX = e.target.x();
          let stageY = e.target.y();
          console.log({ x: e.target.x(), y: e.target.y() });
          // setStagePos();
          const offsetX = Math.floor(stageX);
          const offsetY = Math.floor(stageY);
          console.log(offsetX, offsetY);

          drawGrid(offsetX, offsetY);
        }}
      >
        {/* //layer for grid */}
        <Layer ref={layerRef}>
          {/* {gridCordinates.vLines.map((x, i) => (
            <Line
              key={`v-${i}`}
              points={[x, 0, x, dimension.height]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))} */}

          {/* {gridCordinates.hLines.map((y, j) => (
            <Line
              draggabl
              key={`h-${j}`}
              points={[0, y, dimension.width, y]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))} */}
        </Layer>
        {/* layer for cells? */}
        <Layer>
          {[...aliveCells].map((c, i) => {
            const [xPos, yPos] = c.split(",").map((e) => Number(e));

            return (
              <Rect
                key={`c-${i}`}
                x={xPos * 20}
                y={yPos * 20}
                width={20}
                height={20}
                stroke="oklch(79.2% 0.209 151.711)"
                fill="oklch(79.2% 0.209 151.711)"
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
