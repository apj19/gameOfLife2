import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";


function App() {
  return (
    <>
      <section className="w-full p-2 ">
        <section className="flex items-center justify-center min-h-20 sm:min-h-24 md:min-h-28 text-3xl sm:text-4xl md:text-5xl font-semibold px-4 text-center">
          Game of Life
        </section>

        <section className=" m-4">
          <Routes>
            <Route path="/" element={<Navigate to="/glider" replace />} />
            {/* <Route path="/temp" element={<Fixedcontrols />} /> */}
            <Route path="/:patternParams" element={<Canvas />} />
          </Routes>
          {/* </section>
          <Canvas />
         */}
        </section>

        <section className="h-20  grid grid-cols-2 gap-2 md:flex md:flex-row justify-center pt-6 md:gap-12">
          {/* explanation */}
          <Controls />
        </section>
      </section>
    </>
  );
}

export default App;
