import { day1data1, day1data2 } from "./day1data.ts";

export function day1() {
  const sort1 = day1data1.sort();
  const sort2 = day1data2.sort();

  const totalDifference = sort1.reduce((acc, currentValue, index) => {
    const diff = Math.abs(currentValue - sort2[index]);
    return diff + acc;
  }, 0);
  return totalDifference;
}
console.log(day1());

export function day1b() {
  const occurencesMap = day1data2.reduce((acc, currentValue) => {
    acc[currentValue] = (acc[currentValue] || 0) + 1; 
    return acc;
  }, {} as {[key: number]: number});

  const total = day1data1.reduce((acc, currentValue) => {
    const subtoal = acc + currentValue * (occurencesMap[currentValue] || 0)
    return subtoal;
  }, 0);
  console.log(total);
  return total;
}(day1b());