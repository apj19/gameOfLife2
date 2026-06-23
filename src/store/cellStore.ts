import { nextGeneration } from "@/lib/gameRules";
import { create } from "zustand";

interface CellStore {
  aliveCells: Set<string>;
  addAliveCell: (value: Set<string>) => void;
  nextGen: () => void;
  //   increase: () => void
  //   decrease: () => void
  //   setCount: (value: number) => void
}

// Create the store
export const useCellStore = create<CellStore>((set) => ({
  aliveCells: new Set(), // initial state,
  addAliveCell: (value: Set<string>) => set({ aliveCells: value }),
  nextGen: () =>
    set((state) => ({ aliveCells: nextGeneration(state.aliveCells) })),
  //   increase: () => set((state) => ({ count: state.count + 1 })),
  //   decrease: () => set((state) => ({ count: state.count - 1 })),
  //   setCount: (value: number) => set({ count: value }),
}));
