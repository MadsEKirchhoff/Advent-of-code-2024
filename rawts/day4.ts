import { assertEquals } from "jsr:@std/assert";
const puzzleInput: string = await Deno.readTextFile("data4");

const puzzleInputMatrix: string[][] = puzzleInput.split("\n").map((
  line,
) => [...line]);

const result = puzzleInputMatrix.reduce((acc, currLine, yInit, matrix) => {
  const found = currLine.reduce((acc2, currLetter, xInit) => {
    if (currLetter !== "X") return acc2;

    let foundXmas = 0;
    for (let xAdd = -1; xAdd <= 1; xAdd++) {
      for (let yAdd = -1; yAdd <= 1; yAdd++) {
        if (yAdd === 0 && xAdd === 0) continue;
        const x = xInit + xAdd;
        const y = yInit + yAdd;

        const letter1 = matrix[y]?.[x];
        const x2 = x + xAdd;
        const y2 = y + yAdd;
        const letter2 = matrix[y2]?.[x2];
        const x3 = x + xAdd * 2;
        const y3 = y + yAdd * 2;
        const letter3 = matrix[y3]?.[x3];
        if (letter1 === "M") {
          if (letter2 === "A") {
            if (letter3 === "S") {
              foundXmas++;
            }
          }
        }
      }
    }
    return acc2 + foundXmas;
  }, 0);
  return acc + found;
}, 0);

console.log(result);

const result2 = puzzleInputMatrix.reduce((acc, currLine, y, matrix) => {
  const found = currLine.reduce((acc2, currLetter, x) => {
    const isM = currLetter === "M";
    if (!(currLetter === "S" || currLetter === "M")) return acc2;
    let foundXmas = 0;

    const center = matrix[y + 1]?.[x + 1];
    const southEast = matrix[y + 2]?.[x + 2];
    const northEast = matrix[y]?.[x + 2];
    const southWest = matrix[y + 2]?.[x];
    if (center === "A") {
      console.log(`X:${x}, Y:${y}`);
      console.log(
        `${currLetter} ${northEast}\n ${center} \n${southWest} ${southEast}`,
      );
      if (southEast === "S" && isM || southEast === "M" && !isM) {
        if (northEast === "M" || northEast === "S") {
          const isS = northEast === "S";
          if (southWest === "S" && !isS || southWest === "M" && isS) {
            foundXmas++;
            console.log("found");
          }
        }
      }
    }
    return acc2 + foundXmas;
  }, 0);
  return acc + found;
}, 0);

console.log(result2);
