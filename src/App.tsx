import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { IconBrandGithub } from "@tabler/icons-react";

// function App() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       {children}
//     </ThemeProvider>
//   )
// }

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <section className="w-full p-2 ">
          <section className="flex items-center justify-between  min-h-20 sm:min-h-24 md:min-h-28 text-3xl sm:text-4xl md:text-5xl font-semibold px-4 text-center">
            <Link to="/glider" className="text-foreground">
              Game of Life
            </Link>
            <div className="flex justify-center items-center gap-4">
              <ModeToggle />
              <div className="flex items-center pt-3">
                <a
                  href="https://github.com/apj19/gameOfLife2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub size={26} stroke={1} className="" />
                </a>
              </div>
            </div>
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
      </ThemeProvider>
    </>
  );
}

export default App;
