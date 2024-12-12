import { format } from "@std/fmt/bytes";
import { green, red, yellow } from "@std/fmt/colors";
import { sum } from "https://deno.land/x/sum/mod.ts";
import {
  addCoordinates,
  type Coordinate,
  directionsVector,
  fileToMatrix,
  forEachCoordinate,
  getMatrixValue,
  getMatrixValueXY,
  mapMatrix,
} from "./helpers.ts";

const { matrixXY } = await fileToMatrix("data12");
// Looks like
// AAAA
// BBCD
// BBCC
// EEEC
const explored: (boolean | string)[][] = mapMatrix(matrixXY, (_) => "");

let perimetersX = new Set<Coordinate>();
let perimetersY = new Set<Coordinate>();

const recursiveExploreRegion = (
  currentCoordinate: Coordinate,
  letter: string,
  area: number,
): { area: number } => {
  const [x, y] = currentCoordinate;
  // console.log(x, y);

  explored[x][y] = letter;
  let newArea = area + 1;
  for (const direction of directionsVector) {
    const newCoord = addCoordinates(direction, currentCoordinate);
    const cell = getMatrixValue(newCoord);
    if (!cell || cell !== letter) {
      const [x, y] = newCoord;
      direction[0] === 0
        ? perimetersX.add([x, y + direction[1] / 10])
        : perimetersY.add([x + direction[0] / 10, y]);
      continue;
    }
    if (explored[newCoord[0]]?.[newCoord[1]]) {
      continue;
    }
    const { area: cArea } = recursiveExploreRegion(
      newCoord,
      letter,
      0,
    );
    newArea += cArea;
  }
  return { area: newArea /* TODO: double check */ };
};

let result = 0;

forEachCoordinate(matrixXY, ([x, y]) => {
  if (explored[x][y]) {
    return;
  }
  perimetersX = new Set<Coordinate>();
  perimetersY = new Set<Coordinate>();

  const currentLetter = getMatrixValue([x, y]);
  const { area } = recursiveExploreRegion(
    [x, y],
    currentLetter,
    0,
  );

  const groupedPerimetersX = Object.values(
    Object.groupBy([...perimetersX], ([x, y]) => y),
  ) as Coordinate[][];

  const perimeterX = groupedPerimetersX.reduce((acc2, perimeters) => {
    const lol = perimeters.map(([x]) => x);
    const unique = [...(new Set(lol))].sort();

    const a = unique.reduce(
      (acc, y, index, array) => {
        const prevY = array[index - 1];
        if (y - prevY === 1) return acc;
        return acc + 1;
      },
      0,
    );
    // console.log("X", perimeters[0][1], a, unique);
    return acc2 + a;
  }, 0);

  const groupedPerimetersY = Object.values(
    Object.groupBy([...perimetersY], ([x, y]) => x),
  ) as Coordinate[][];

  const perimeterY = groupedPerimetersY.reduce((acc2, perimeters) => {
    const lol = perimeters.map(([x, y]) => y);
    const unique = [...(new Set(lol))].sort();
    const a = unique.reduce(
      (acc, y, index, array) => {
        const prevY = array[index - 1];
        if (y - prevY === 1) return acc;
        return acc + 1;
      },
      0,
    );
    // console.log("Y", perimeters[0][0], a, unique);
    return acc2 + a;
  }, 0);

  const perimeter = perimeterX + perimeterY;
  result += area * perimeter;
  // console.log(groupedPerimetersY);
  // console.log(
  //   currentLetter,
  //   // [x, y],
  //   area,
  //   `X total:${perimeterX}`,
  //   `Y total:${perimeterY}`,
  //   perimeter,
  //   area * perimeter,
  // );
  // area;
});
console.log(result);
