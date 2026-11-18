const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(n, m, q) {
  let rowParity = new Uint8Array(n + 1);
  let colParity = new Uint8Array(m + 1);

  for (let i = 0; i < q; i++) {
    const [r, c] = readIntArray();
    rowParity[r] ^= 1;
    colParity[c] ^= 1;
  }

  let oddRows = 0n;
  for (let i = 1; i <= n; i++) {
    if (rowParity[i]) oddRows++;
  }

  let oddCols = 0n;
  for (let j = 1; j <= m; j++) {
    if (colParity[j]) oddCols++;
  }

  let bigN = BigInt(n);
  let bigM = BigInt(m);
  let evenRows = bigN - oddRows;
  let evenCols = bigM - oddCols;

  let ans = oddRows * evenCols + evenRows * oddCols;
  return ans.toString();
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, m, q] = readIntArray();
    print(solveCase(n, m, q));
  }
}

solve();
printAll();
