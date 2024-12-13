export type Coordinate = [number, number];

let matrixXY: string[][];

export const fileToMatrix = async (filename: number) => {
  const puzzleInputStr: string =(await import(`./data${filename}.txt`)).default;
  const lineMap = puzzleInputStr.split("\r\n");

  matrixXY = lineMap.map((
    line,
  ) => [...line]);
  const matrixYX = lineMap.map((_, colIndex) =>
    lineMap.map((row) => row[colIndex])
  );
  return matrixXY;
};


export const mapMatrix = <T>(maxtrix: string[][], fn: (cell: string) => T) =>
  maxtrix.map((row, x) => row.map((cell, y) => fn(cell)));

export const getMatrixValue = ([x, y]: Coordinate): string => {
  return matrixXY[y]?.[x];
};

export const getMatrixValueXY = <T>(
  maxtrixXY: T[][],
  [x, y]: Coordinate,
): T => {
  return maxtrixXY[x][y];
};

export const addCoordinates = (a: Coordinate, b: Coordinate): Coordinate => {
  return [a[0] + b[0], a[1] + b[1]];
};

export const directionsVector: Coordinate[] = [[-1, 0], [0, -1], [1, 0], [
  0,
  1,
]];

export const forEachCoordinate = (
  matrixXY: string[][],
  fn: (c: Coordinate) => void,
) => {
  for (let y = 0; y < matrixXY.length; y++) {
    for (let x = 0; x < matrixXY[y].length; x++) {
      fn([x, y]);
    }
  }
};
