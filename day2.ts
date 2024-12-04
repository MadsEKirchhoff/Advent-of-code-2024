const text = await Deno.readTextFile("day2data");
const data: string[] = text.split("\n");
const numLevels = data.map((line) =>
  line.split(" ").map((level) => Number.parseInt(level))
);

const consistentIncreasingLines = numLevels.reduce((acc, line) => {
  const increasing = line[0] < line[1];
  const safe = line.every((level, i) => {
    const prev = line[i - 1];
    if (prev === undefined) {
      return true;
    }
    const safe = prev < level === increasing && Math.abs(prev - level) <= 3 &&
      Math.abs(prev - level) > 0;
    return safe;
  });
  return acc + +safe;
}, 0);
console.log(consistentIncreasingLines);

// const text = await Deno.readTextFile("day2data");
// const data: string[] = text.split("\n");
// const numLevels = data.map((line) => line.split(" ").map((level) => Number.parseInt(level)))

const checkSafety = (dampenedLine: number[]) => {
  const increasing = dampenedLine[0] < dampenedLine[1];
  return dampenedLine.every((level, i) => {
    const prev = dampenedLine[i - 1];
    if (prev === undefined) {
      return true;
    }
    const safe = prev < level === increasing && Math.abs(prev - level) <= 3 &&
      Math.abs(prev - level) > 0;
    return safe;
  });
};

const safeish = numLevels.reduce((acc, line) => {
  const someSafe = checkSafety(line) || line.some((_, i) => {
    // remove index from line
    const dampenedLine = line.filter((_, index) => index !== i);
    return checkSafety(dampenedLine);
  });
  return acc + +someSafe;
}, 0);
console.log(safeish);
