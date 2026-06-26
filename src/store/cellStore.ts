import { nextGeneration } from "@/lib/gameRules";
import { create } from "zustand";

interface CellStore {
  aliveCells: Set<string>;
  allDead: boolean;
  speed: number;
  generation: number;
  setGeneration: () => void;
  restGeneration: () => void;
  setSpeed: (value: number) => void;
  addAliveCell: (value: Set<string>) => void;
  nextGen: () => void;
  clearCells: () => void;
  isAllDead: () => void;
  //   increase: () => void
  //   decrease: () => void
  //   setCount: (value: number) => void
}

// Create the store
export const useCellStore = create<CellStore>((set) => ({
  aliveCells: new Set(), // initial state,
  allDead: false,
  speed: 2,
  generation: 1,
  setGeneration: () => set((state) => ({ generation: state.generation + 1 })),
  restGeneration: () => set({ generation: 1 }),
  setSpeed: (value: number) => set({ speed: value }),
  addAliveCell: (value: Set<string>) => set({ aliveCells: value }),
  nextGen: () =>
    set((state) => ({ aliveCells: nextGeneration(state.aliveCells) })),
  clearCells: () => set(() => ({ aliveCells: new Set<string>(null) })),
  isAllDead: () =>
    set((state) => {
      if (state.aliveCells.size == 0) {
        return { allDead: true };
      } else {
        return { allDead: false };
      }
    }),
  //   increase: () => set((state) => ({ count: state.count + 1 })),
  //   decrease: () => set((state) => ({ count: state.count - 1 })),
  //   setCount: (value: number) => set({ count: value }),
}));
