import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
// import { nextGeneration } from "@/lib/gameRules";
import { useCellStore } from "@/store/cellStore";
import Konva from "konva";
import intailGameSetup from "@/lib/intailGameSetup";
// import { lwss } from "@/lib/gamePopulaerPattrens";
import { useNavigate, useParams } from "react-router-dom";
import * as PATTERNS from "@/lib/gamePopulaerPattrens";

function Canvas() {
  const GRID_SIZE = 20;
  const navigate = useNavigate();
  //seeting convas dynamic size as per views
  const [dimension, setDimension] = useState({
    width: Math.floor(window.innerWidth),
    height: Math.floor(window.innerHeight * 0.7),
  });

  const gridLyer = useRef<Konva.Layer>(null);

  const { aliveCells, addAliveCell, isAllDead } = useCellStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const { patternParams } = useParams();
  // console.log("pattern", pattern);
  //selecting pattern as per url params
  type PatternKey = keyof typeof PATTERNS;

  // const defaultPattern: PatternKey = "toad";

  useEffect(() => {
    // let selectedPattern: number[][] = PATTERNS[defaultPattern];

    if (!patternParams || !(patternParams in PATTERNS)) {
      navigate(`/`, { replace: true });
      return;
    } else {
      const selectedPattern = PATTERNS[patternParams as PatternKey];

      addAliveCell(intailGameSetup(selectedPattern));
      isAllDead();
    }
  }, [patternParams]);

  //updating grid for conavs as per size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    drawGrid(dimension.width, dimension.height, 0, 0);
    setDimension({
      width,
      height,
    });

    function handleResize() {
      const { width, height } = container!.getBoundingClientRect();
      setDimension({ width, height });
      console.log("resized", width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function drawGrid(
    width: number,
    height: number,
    viewStartX: number = 0,
    viewStartY: number = 0,
  ) {
    const layer = gridLyer.current;

    if (!layer) return;

    layer.destroyChildren();

    let viewEndX = viewStartX + width;
    let viewEndY = viewStartY + height;

    const xStart = Math.floor(viewStartX / GRID_SIZE) * GRID_SIZE;
    const yStart = Math.floor(viewStartY / GRID_SIZE) * GRID_SIZE;

    for (let i = xStart; i < Math.floor(viewEndX); i = i + GRID_SIZE) {
      const line = new Konva.Line({
        points: [i, viewStartY, i, viewEndY],
        stroke: "#ccc",
        strokeWidth: 0.5,
      });

      layer.add(line);
    }

    for (let i = yStart; i < Math.floor(viewEndY); i += GRID_SIZE) {
      const line = new Konva.Line({
        points: [viewStartX, i, viewEndX, i],
        stroke: "#ccc",
        strokeWidth: 0.5,
      });

      layer.add(line);
    }

    layer.batchDraw();
  }

  //handle click on canvas,add alive cell
  function handleClick(e: KonvaEventObject<MouseEvent>) {
    const stage = e.target.getStage();
    const pointerPos = stage!.getRelativePointerPosition();
    if (!pointerPos) return;

    const x = Math.floor(pointerPos.x / GRID_SIZE);
    const y = Math.floor(pointerPos.y / GRID_SIZE);
    // console.group("Click Position", pointerPos, x, y);

    let tesmpSet = new Set<string>(aliveCells);

    let currCellKey = `${x},${y}`;
    if (tesmpSet.has(currCellKey)) {
      tesmpSet.delete(currCellKey);
    } else {
      tesmpSet.add(currCellKey);
    }

    addAliveCell(tesmpSet);
    isAllDead();
  }

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
        <Stage
          width={dimension.width}
          height={dimension.height}
          className="border"
          onClick={handleClick}
          draggable={true}
          onDragEnd={(e) => {
            // console.log({ x: e.target.x(), y: e.target.y() });

            let viewStartX: number = -e.target.x();
            let viewStartY: number = -e.target.y();

            // const xStart = Math.floor(viewStartX / GRID_SIZE) * GRID_SIZE;
            // const yStart = Math.floor(viewStartY / GRID_SIZE) * GRID_SIZE;

            // setstageCordinates({ x: xStart, y: yStart });

            drawGrid(dimension.width, dimension.height, viewStartX, viewStartY);
          }}
        >
          {/* //layer for grid */}
          <Layer ref={gridLyer}>
            {/* {gridCordinate.vLine.map((x, i) => (
            <Line
              key={`v-${i}`}
              points={[x, stageCordinates.y, x, dimension.height]}
              stroke="#ccc"
              strokeWidth={0.5}
            />
          ))}

          {gridCordinate.hLine.map((y, j) => (
            <Line
              key={`h-${j}`}
              points={[stageCordinates.x, y, dimension.width, y]}
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
      </div>
    </>
  );
}

export default Canvas;
