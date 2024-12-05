const puzzleInput = await Deno.readTextFile("data3");

const reggie = /mul\((\d+),(\d+)\)/gm;
const mults = [...puzzleInput.matchAll(reggie)];

const a = mults.reduce((acc, curr, index) => {
  const [_, a, b] = curr;
  return acc + Number.parseInt(a) * Number.parseInt(b);
}, 0);

const reggie2 = /(?:mul\((\d+),(\d+)\))|(?:do\(\))|(?:don't\(\))/gm;
const mults2 = [...puzzleInput.matchAll(reggie2)];

let doer = true;
const bab = mults2.reduce((acc, curr, index) => {
  const [text, a, b] = curr;
  if (text === "do()") {
    doer = true;
    return acc;
  }
  if (text === "don't()") {
    doer = false;
    return acc;
  }
  if (!doer) {
    return acc;
  }
  return acc + Number.parseInt(a) * Number.parseInt(b);
}, 0);

console.log(bab);
