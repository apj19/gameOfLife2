import { Button } from "@/components/ui/button";
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
  const { nextGen, clearCells } = useCellStore();
  const [start, setStart] = useState(false);

  function handlenextgen() {
    // setAliveCells(nextGeneration(aliveCells));
    nextGen();
  }

  function handleRest() {
    clearCells();
    setStart(false);
  }

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      // setAliveCells((prv) => nextGeneration(prv));
      nextGen();
      // console.log("changed");
    }, 500);

    return () => clearInterval(interval);
  }, [start]);

  return (
    <>
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline" size="lg">
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
      <Button onClick={() => setStart(!start)} variant="outline" size="lg">
        {start ? "Stop" : "Start"}
      </Button>
      <Button onClick={handlenextgen} variant="outline" size="lg">
        Next
      </Button>
      <Button onClick={handleRest} variant="outline" size="lg">
        Reset
      </Button>
    </>
  );
}
