import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  return (
    <>
      <section className="w-full p-2 ">
        {/* <div className="flex min-h-svh flex-col items-center justify-center">
          <Button>Click me here</Button>
        </div> */}
        {/* 1. main heading
            2. main canvas
            3. nav/butn bar
         */}

        <section className="h-20  text-[40px] pl-2 text-center ">
          Game of Life
        </section>
        <section className="border">Canvas</section>
        <section className="h-20  flex flex-row justify-center pt-6 gap-12">
          {/* explanation */}
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
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
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
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="lg">
            Start
          </Button>
          <Button variant="outline" size="lg">
            Next
          </Button>
          <Button variant="outline" size="lg">
            Reset
          </Button>
        </section>
      </section>
    </>
  );
}

export default App;
