const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function modPow(base, exp, mod) {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
}

function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n || n === 5n || n === 7n) return true;
  if (n % 2n === 0n || n % 3n === 0n || n % 5n === 0n || n % 7n === 0n) return false;
  let d = n - 1n;
  let s = 0;
  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }
  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (let a of bases) {
    if (n <= a) break;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let comp = true;
    for (let r = 1; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        comp = false;
        break;
      }
    }
    if (comp) return false;
  }
  return true;
}

function solvePattern(pat) {
  const L = pat.length;
  const qIndices = [];
  for (let i = 0; i < L; i++) {
    if (pat[i] === '?') qIndices.push(i);
  }

  let digits = pat.split('');
  function dfs(idx) {
    if (idx === qIndices.length) {
      if (digits[0] === '0') return false;
      let val = BigInt(digits.join(''));
      return isPrime(val);
    }
    const pos = qIndices[idx];
    const isFirst = (pos === 0);
    const isLast = (pos === L - 1);
    let candidates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (isFirst) candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (isLast && L > 1) candidates = candidates.filter(d => d === 1 || d === 3 || d === 7 || d === 9);
    else if (isLast && L === 1) candidates = [2, 3, 5, 7];

    for (let c of candidates) {
      digits[pos] = String(c);
      if (dfs(idx + 1)) return true;
    }
    return false;
  }

  dfs(0);
  return digits.join('');
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const pat = readLine().trim();
    print(solvePattern(pat));
  }
}

solve();
printAll();
