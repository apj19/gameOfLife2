export function nextGeneration(aliveCells: Set<string>) {
  const nextGen = new Set<string>();
  const neighbor = new Map<string, number>();

  for (let key of aliveCells) {
    let [x, y] = key.split(",").map((e) => Number(e));

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx == 0 && dy == 0) {
          //ignore self cell
        } else {
          let nbkey = `${x + dx},${y + dy}`;
          neighbor.set(nbkey, (neighbor.get(nbkey) ?? 0) + 1 || 1);
        }
      }
    }
  }

  for (let [key, cnt] of neighbor) {
    if (aliveCells.has(key)) {
      //check if alive cell survives here
      if (cnt == 2 || cnt == 3) {
        nextGen.add(key);
      }
    } else {
      //dead cell tyo new cell
      if (cnt == 3) {
        nextGen.add(key);
      }
    }
  }

  return nextGen;
}
