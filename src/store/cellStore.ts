import { nextGeneration } from "@/lib/gameRules";
import { create } from "zustand";

interface CellStore {
  aliveCells: Set<string>;
  allDead: boolean;
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
  allDead: true,
  addAliveCell: (value: Set<string>) => set({ aliveCells: value }),
  nextGen: () =>
    set((state) => ({ aliveCells: nextGeneration(state.aliveCells) })),
  clearCells: () => set((state) => ({ aliveCells: new Set<string>(null) })),
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
