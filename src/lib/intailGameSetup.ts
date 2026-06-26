export default function intailGameSetup(
  pattrenCodinates: number[][],
): Set<string> {
  const offsetX = 5; // Adjust the X offset as needed
  const offsetY = 5; // Adjust the Y offset as needed
  const aliveCells = new Set<string>();

  for (const [x, y] of pattrenCodinates) {
    aliveCells.add(`${x + offsetX},${y + offsetY}`);
  }

  return aliveCells;
}
