import "./App.css";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

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
        <section className="">
          <Canvas />
        </section>
        <section className="h-20  flex flex-row justify-center pt-6 gap-12">
          {/* explanation */}
          <Controls />
        </section>
      </section>
    </>
  );
}

export default App;
