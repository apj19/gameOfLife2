import { Button } from "@/components/ui/button";
import {
  IconExclamationCircle,
  IconBook,
  IconPlayerPlay,
  IconArrowForwardUp,
  IconRestore,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCellStore } from "@/store/cellStore";
import { useEffect, useState } from "react";
import PatternList from "./ui/Pattrenlist";
import { useNavigate } from "react-router-dom";

// import { Icon } from "node_modules/@base-ui/react/select/index.parts";

export default function Controls() {
  const navigate = useNavigate();

  const { nextGen, allDead, isAllDead, speed, setGeneration, restGeneration } =
    useCellStore();
  // const nextGen = useCellStore((state) => state.nextGen);
  // const clearCells = useCellStore((state) => state.clearCells);
  // const isAllDead = useCellStore((state) => state.isAllDead);
  // const allDead = useCellStore((state) => state.allDead);

  const [start, setStart] = useState(false);

  const [open, setOpen] = useState(false);

  function handlenextgen() {
    // setAliveCells(nextGeneration(aliveCells));
    nextGen();
    setGeneration();
  }

  function handleRest() {
    setStart(false);
    // clearCells();
    // isAllDead();
    restGeneration();
    navigate(`/`, { replace: true });
  }

  useEffect(() => {
    // console.group("spped useEffect", speed);

    if (!start) return;

    const interval = setInterval(
      () => {
        // setAliveCells((prv) => nextGeneration(prv));

        nextGen(); //this updated store state
        setGeneration();
        const latest = useCellStore.getState().aliveCells;
        if (latest.size == 0) {
          setStart(false);
          isAllDead();
        }

        // console.group("changed");
      },
      Math.floor(1000 / speed),
    );

    return () => clearInterval(interval);
  }, [start, speed]);

  return (
    <>
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline" size="lg">
              <IconExclamationCircle data-icon="inline-start" />
              Explanation
            </Button>
          }
        />
        <DialogContent className="w-[95vw]! md:w-[60vw]! lg:w-[50vw]! max-w-none!">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Explanation
            </DialogTitle>
            <div>
              <div className="my-4">
                The Game of Life is not your typical computer game. It is a
                cellular automaton, and was invented by Cambridge mathematician
                John Conway. This game became widely known when it was mentioned
                in an article published by Scientific American in 1970. It
                consists of a grid of cells which, based on a few mathematical
                rules, can live, die or multiply. Depending on the initial
                conditions, the cells form various patterns throughout the
                course of the game.
              </div>
              <div className="mt-2 border-rose-200 border-2 rounded-md p-4">
                <span className="text-lg font-semibold">
                  Game of Life Rules
                </span>
                <ul className="list-disc list-inside my-4">
                  <li className="mb-2">
                    Each cell with one or no neighbors dies, as if by solitude.
                  </li>
                  <li className="mb-2">
                    Each cell with two or three neighbors lives on.
                  </li>
                  <li className="mb-2">
                    Each cell with four or more neighbors dies, as if by
                    overpopulation.
                  </li>
                  <li className="mb-2">
                    Each dead cell with exactly three neighbors becomes a live
                    cell, as if by reproduction.
                  </li>
                </ul>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* //patterns */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant="outline" size="lg">
              <IconBook data-icon="inline-start" />
              patterns
            </Button>
          }
        />
        <DialogContent className="w-[95vw]! md:w-[60vw]! lg:w-[50vw]! max-w-none!">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Intresting Patterns
            </DialogTitle>
            <div>
              The blow are few Intersting patterns occures in Game of Life. You
              can select any pattern to see how it works.
              <div className="flex w-full my-4 flex-col gap-4">
                <PatternList onSelectClose={() => setOpen(false)} />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => setStart(!start)}
        disabled={allDead}
        variant="outline"
        size="lg"
      >
        <IconPlayerPlay data-icon="inline-start" />
        {start ? "Stop" : "Start"}
      </Button>
      <Button
        onClick={handlenextgen}
        disabled={allDead}
        variant="outline"
        size="lg"
      >
        <IconArrowForwardUp data-icon="inline-start" />
        Next
      </Button>
      <Button
        onClick={handleRest}
        disabled={allDead}
        variant="outline"
        size="lg"
      >
        <IconRestore data-icon="inline-start" />
        Reset
      </Button>
    </>
  );
}
// data-icon="inline-start"
