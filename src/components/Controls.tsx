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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCellStore } from "@/store/cellStore";
import { useEffect, useState } from "react";

export default function Controls() {
  const { nextGen, clearCells, allDead, isAllDead } = useCellStore();
  const [start, setStart] = useState(false);

  function handlenextgen() {
    // setAliveCells(nextGeneration(aliveCells));
    nextGen();
  }

  function handleRest() {
    setStart(false);
    clearCells();
    isAllDead();
  }

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      // setAliveCells((prv) => nextGeneration(prv));

      nextGen(); //this updated store state
      const latest = useCellStore.getState().aliveCells;
      if (latest.size == 0) {
        setStart(false);
        isAllDead();
      }

      // console.group("changed");
    }, 500);

    return () => clearInterval(interval);
  }, [start]);

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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* //patterns */}
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline" size="lg">
              <IconBook data-icon="inline-start" />
              patterns
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>patterns?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => setStart(!start)}
        disabled={allDead ? true : false}
        variant="outline"
        size="lg"
      >
        <IconPlayerPlay data-icon="inline-start" />
        {start ? "Stop" : "Start"}
      </Button>
      <Button
        onClick={handlenextgen}
        disabled={allDead ? true : false}
        variant="outline"
        size="lg"
      >
        <IconArrowForwardUp data-icon="inline-start" />
        Next
      </Button>
      <Button
        onClick={handleRest}
        disabled={allDead ? true : false}
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
