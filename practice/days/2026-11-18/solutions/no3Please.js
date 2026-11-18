const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function getPattern(n, first) {
  let t = [first];
  if (first === 1) {
    if (n > 1) t.push(1);
    for (let i = 2; i < n; i++) t.push(i % 2 === 0 ? 2 : 1);
  } else {
    if (n > 1) t.push(2);
    for (let i = 2; i < n; i++) t.push(i % 2 === 0 ? 1 : 2);
  }
  return t;
}

function check(n, A, T) {
  let diffs = [];
  for (let i = 0; i < n; i++) {
    if (A[i] !== T[i]) diffs.push(i);
  }
  if (diffs.length === 0) return true;
  let last = diffs[diffs.length - 1];

  const P1 = 313n, M1 = 1000000007n;
  const P2 = 317n, M2 = 1000000009n;

  let pow1 = [1n], pow2 = [1n];
  for (let i = 0; i < n; i++) {
    pow1.push((pow1[i] * P1) % M1);
    pow2.push((pow2[i] * P2) % M2);
  }

  let hT1 = [0n], hT2 = [0n];
  for (let i = 0; i < n; i++) {
    hT1.push((hT1[i] * P1 + BigInt(T[i])) % M1);
    hT2.push((hT2[i] * P2 + BigInt(T[i])) % M2);
  }

  let hA_rev1 = [0n], hA_rev2 = [0n];
  let cur1 = 0n, cur2 = 0n;
  for (let i = 0; i < n; i++) {
    cur1 = (cur1 + BigInt(A[i]) * pow1[i]) % M1;
    cur2 = (cur2 + BigInt(A[i]) * pow2[i]) % M2;
    hA_rev1.push(cur1);
    hA_rev2.push(cur2);
  }

  for (let k = last + 1; k <= n; k++) {
    if (hT1[k] === hA_rev1[k] && hT2[k] === hA_rev2[k]) return true;
  }
  return false;
}

function solveCase(n, a) {
  if (n === 1) return 'Yes';
  let p1 = getPattern(n, 1);
  let p2 = getPattern(n, 2);
  if (check(n, a, p1) || check(n, a, p2)) return 'Yes';
  return 'No';
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readIntArray();
    print(solveCase(n, a));
  }
}

solve();
printAll();
