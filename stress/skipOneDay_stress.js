const fs = require('fs');

function oracle(arr) {
  let maxVal = -Infinity;
  const total = arr.reduce((acc, v) => acc + v, 0);
  for (let i = 0; i < arr.length; i++) {
    const candidate = total - arr[i];
    if (candidate > maxVal) {
      maxVal = candidate;
    }
  }
  return maxVal;
}

function solveOne(arr) {
  let sum = 0;
  let minVal = Infinity;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (arr[i] < minVal) {
      minVal = arr[i];
    }
  }
  return sum - minVal;
}

let testCount = 0;

for (let n = 1; n <= 10; n++) {
  for (let round = 0; round < 100; round++) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * 201) - 100);
    }
    const expected = oracle(arr);
    const actual = solveOne(arr);
    if (expected !== actual) {
      console.error(`Mismatch on input ${JSON.stringify(arr)}: expected ${expected}, got ${actual}`);
      process.exit(1);
    }
    testCount++;
  }
}

const largeN = 100000;
const largeArr = new Int32Array(largeN);
let sumLarge = 0;
let minLarge = 101;
for (let i = 0; i < largeN; i++) {
  largeArr[i] = Math.floor(Math.random() * 201) - 100;
  sumLarge += largeArr[i];
  if (largeArr[i] < minLarge) minLarge = largeArr[i];
}
const start = performance.now();
const largeAns = solveOne(largeArr);
const duration = performance.now() - start;

if (largeAns !== sumLarge - minLarge) {
  console.error("Large array test failed!");
  process.exit(1);
}

console.log(`Verified ${testCount} random test cases successfully.`);
console.log(`Worst-case execution (N=100,000) finished in ${duration.toFixed(2)} ms.`);
