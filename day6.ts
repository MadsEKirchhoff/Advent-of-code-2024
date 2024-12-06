import { format } from "@std/fmt/bytes";
import { green, red, yellow } from "@std/fmt/colors";
import { sum } from "https://deno.land/x/sum/mod.ts";

const puzzleInputStr: string = await Deno.readTextFile("data6");
const lineMap = puzzleInputStr.split("\r\n");

type Coordinate = [number, number];

const transposedMap = lineMap.map((
  line,
) => [...line]);
const map = lineMap.map((_, colIndex) => lineMap.map((row) => row[colIndex]));

let startY = 0;
const startX = map.findIndex((line, i) => {
  startY = line.indexOf("^");
  return startY !== -1;
});

const guardPosition: Coordinate = [startX, startY];

const directionsVector: Coordinate[] = [[-1, 0], [0, -1], [1, 0], [0, 1]];
let guardDirectionIndex = 1;

// arrays are all unique, can't set them
const visited = new Set<string>();

while (true) {
  const [x, y] = guardPosition;
  visited.add([x, y].toString());
  // console.log(`  ${guardPosition}\n`);
  const [dx, dy] = directionsVector[guardDirectionIndex];
  const [nx, ny] = [x + dx, y + dy];

  if (map[nx][ny] === "#") {
    const printLine = transposedMap
      .map(
        (column, ty) => {
          return `${
            column.map(
              (cell, tx) => {
                if (x === tx && y === ty) {
                  return red("^");
                }
                if (visited.has([tx, ty].toString())) {
                  return yellow("X");
                }
                if (cell === "#") {
                  return "#";
                }
                return cell;
              },
            ).join("")
          }`;
        },
      );
    console.log(printLine.join("\n"));
    guardDirectionIndex++;
    guardDirectionIndex %= directionsVector.length;
    continue;
  }
  guardPosition[0] = nx;
  guardPosition[1] = ny;

  if (map[nx]?.[ny] == null) {
    break;
  }
}

const visitedCount = visited.size;
console.log(visited.size);
const t2 = performance.now();
console.log(`${t2} ms since start !`);

// arrays are all unique, can't set them

let good = 0;
for (const obstruction of [...visited].slice(1)) {
  guardPosition[0] = startX;
  guardPosition[1] = startY;

  guardDirectionIndex = 1;
  const newMap = map.map((line) => [...line]);
  const [ox, oy] = obstruction.split(",").map((x) => Number.parseInt(x));
  newMap[ox][oy] = "#";

  // newMap
  //   .map(
  //     (column, ty) => {
  //       console.log(
  //         column.map(
  //           (cell, tx) => {
  //             if (ox === tx && ox === ty) {
  //               return red(cell);
  //             }
  //             // if (visited.has([tx, ty].toString())) {
  //             //   return yellow("X");
  //             // }
  //             if (cell === "#") {
  //               return "#";
  //             }
  //             return cell;
  //           },
  //         ).join(""),
  //       );
  //     },
  //   );

  const visitedDirections = new Set<string>();
  while (true) {
    const [x, y] = guardPosition;
    const newLocal = [x, y, guardDirectionIndex].toString();
    if (visitedDirections.has(newLocal)) {
      good++;
      break;
    }
    visitedDirections.add(newLocal);
    // console.log(`  ${guardPosition}\n`);
    const [dx, dy] = directionsVector[guardDirectionIndex];
    const [nx, ny] = [x + dx, y + dy];

    if (newMap[nx]?.[ny] == null) {
      break;
    }
    if (newMap[nx]?.[ny] === "#") {
      // transposedMap
      //   .map(
      //     (column, ty) => {
      //       console.log(
      //         column.map(
      //           (cell, tx) => {
      //             if (x === tx && y === ty) {
      //               return red("^");
      //             }
      //             if (visited.has([tx, ty].toString())) {
      //               return yellow("X");
      //             }
      //             if (cell === "#") {
      //               return "#";
      //             }
      //             return cell;
      //           },
      //         ).join(""),
      //       );
      //     },
      //   );
      guardDirectionIndex++;
      guardDirectionIndex %= directionsVector.length;
      continue;
    }
    guardPosition[0] = nx;
    guardPosition[1] = ny;
  }
}
console.log(good);

console.log(`Part b: ${performance.now()} ms `);
