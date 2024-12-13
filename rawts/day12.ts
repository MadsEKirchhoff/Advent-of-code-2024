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

const recursiveExploreRegion = (
  currentCoordinate: Coordinate,
  letter: string,
  area: number,
  perimeter: number,
): { area: number; perimeter: number } => {
  const [x, y] = currentCoordinate;
  // console.log(x, y);
  const cell = getMatrixValue(currentCoordinate);
  if (!cell) {
    return { area, perimeter: perimeter + 1 };
  }
  if (cell !== letter) {
    return { area, perimeter: perimeter + 1 };
  }
  if (explored[x]?.[y]) {
    return { area, perimeter: perimeter };
  }
  explored[x][y] = letter;
  let newArea = area + 1;
  let newPerimeter = perimeter;
  for (const direction of directionsVector) {
    const newCoord = addCoordinates(direction, currentCoordinate);
    const { area: cArea, perimeter: cPerimeters } = recursiveExploreRegion(
      newCoord,
      letter,
      0,
      0,
    );
    newArea += cArea;
    newPerimeter += cPerimeters;
  }
  return { area: newArea, perimeter: newPerimeter /* TODO: double check */ };
};

let result = 0;
forEachCoordinate(matrixXY, ([x, y]) => {
  if (explored[x][y]) {
    return;
  }
  const currentLetter = getMatrixValue([x, y]);
  const { area, perimeter } = recursiveExploreRegion(
    [x, y],
    currentLetter,
    0,
    0,
  );
  result += area * perimeter;
  console.log(currentLetter, [x, y], area, perimeter, area * perimeter);
});
console.log(result);
