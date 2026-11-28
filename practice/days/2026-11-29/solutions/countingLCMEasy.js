const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const qs = new Int32Array(T);
  let mx = 1;
  for (let t = 0; t < T; t++) {
    qs[t] = readInt();
    if (qs[t] > mx) mx = qs[t];
  }
  const spf = new Int32Array(mx + 1);
  for (let i = 2; i <= mx; i++) {
    if (spf[i]) continue;
    for (let j = i; j <= mx; j += i) if (!spf[j]) spf[j] = i;
  }
  const pref = new Float64Array(mx + 1);
  pref[1] = 1;
  for (let i = 2; i <= mx; i++) {
    let x = i, f = 1;
    while (x > 1) {
      const p = spf[x];
      let e = 0;
      while (x % p === 0) {
        x /= p;
        e++;
      }
      f *= 2 * e + 1;
    }
    pref[i] = pref[i - 1] + f;
  }
  for (let t = 0; t < T; t++) {
    const z = qs[t];
    print(z * z - pref[z]);
  }
}

solve();
printAll();
