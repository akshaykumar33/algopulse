const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const [n, m] = readIntArray();
  const spf = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) if (!spf[i]) for (let j = i; j <= n; j += i) if (!spf[j]) spf[j] = i;
  const own = new Int32Array(n + 1);
  const on = new Uint8Array(n + 1);
  const primes = (x) => {
    const ps = [];
    while (x > 1) { const p = spf[x]; ps.push(p); while (x % p === 0) x /= p; }
    return ps;
  };
  for (let q = 0; q < m; q++) {
    const [op, xs] = readLine().trim().split(/\s+/);
    const x = parseInt(xs, 10);
    if (op === "+") {
      if (on[x]) { print("Already on"); continue; }
      const ps = primes(x);
      let bad = 0;
      for (const p of ps) if (own[p]) { bad = own[p]; break; }
      if (bad) { print("Conflict with " + bad); continue; }
      on[x] = 1;
      for (const p of ps) own[p] = x;
      print("Success");
    } else {
      if (!on[x]) { print("Already off"); continue; }
      on[x] = 0;
      for (const p of primes(x)) own[p] = 0;
      print("Success");
    }
  }
}

solve();
printAll();
