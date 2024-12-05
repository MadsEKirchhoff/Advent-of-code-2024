import { format } from "@std/fmt/bytes";
import { green, red, yellow } from "@std/fmt/colors";
import { sum } from "https://deno.land/x/sum/mod.ts";
import process from "node:process";

const puzzleInput: string = await Deno.readTextFile("data5");
const [orderStr, printsStr] = puzzleInput.split("\r\n\r\n").map((x) =>
  x.split("\n")
);
const orderings = orderStr.map((o) =>
  o.split("|").map((y) => Number.parseInt(y))
);
const orderingSets = orderings.reduce(
  (acc: Record<number, Set<number>>, pair) => {
    acc[pair[0]] = acc[pair[0]] || new Set();
    acc[pair[0]].add(pair[1]);
    return acc;
  },
  {},
);

const prints = printsStr.map((o) =>
  o.split(",").map((y) => Number.parseInt(y))
);
const printsDict = prints.map((p, i) =>
  Object.fromEntries(p.map((p2) => [p2, i]))
);

const rightOrder = prints.filter((printLine) => {
  const rights = printLine.map((x, i) => {
    if (i === 0) return true;
    const prevSet = new Set(printLine.slice(0, i));
    const right = !orderingSets[x]?.intersection(prevSet).size;
    return right;
  });
  const rightOrde = rights.every((x) => x);
  console.log(
    rights.map((x, i) => {
      const print = printLine[i].toString();
      return x && rightOrde ? green(print) : x ? yellow(print) : red(print);
    }).join(","),
  );

  return rightOrde;
}).map((x) => x[Math.floor(x.length / 2)]);

const summ = sum(rightOrder);
console.log(summ);

// const recursiveOrder = (
//   y: number,
//   page: number,
//   full: Set<number>,
//   used: number[],
//   final: number[] = [],
// ): number[] => {
// };

const wrongOrders = prints.filter((printLine) => {
  const rightOrder = printLine.every((x, i) => {
    if (i === 0) return true;
    const prevSet = new Set(printLine.slice(0, i));
    return !orderingSets[x]?.intersection(prevSet).size;
  });
  return !rightOrder;
}).map((printLine, i) => {
  while (true) {
    const copy = [...printLine];

    printLine.sort((a, b) => {
      return orderingSets[a].has(b) ? -1 : orderingSets[b].has(a) ? 1 : 0;
    });
    if (JSON.stringify(printLine) === JSON.stringify(copy)) {
      break;
    }
  }
  return printLine;
  // return recursiveOrder(i, printLine[0], new Set(printLine), printLine);
}).map((x) => x[Math.floor(x.length / 2)]);

const sum2 = sum(wrongOrders);
