const fs = require('fs');
const data = fs.readFileSync(0);
let pos = 0;

const readInt = () => {
  while (data[pos] !== 45 && (data[pos] < 48 || data[pos] > 57)) pos++;
  let neg = false;
  if (data[pos] === 45) {
    neg = true;
    pos++;
  }
  let x = 0;
  while (data[pos] >= 48 && data[pos] <= 57) x = x * 10 + data[pos++] - 48;
  return neg ? -x : x;
};

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    let mn1 = Infinity, mn2 = Infinity, mx1 = -Infinity, mx2 = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = readInt();
      if (v < mn1) {
        mn2 = mn1;
        mn1 = v;
      } else if (v < mn2) mn2 = v;
      if (v > mx1) {
        mx2 = mx1;
        mx1 = v;
      } else if (v > mx2) mx2 = v;
    }
    const c = n >= 4 ? [mn1, mn2, mx2, mx1] : n === 3 ? [mn1, mn2, mx1] : [mn1, mx1];
    let ans = null;
    for (let i = 0; i < c.length; i++) {
      for (let j = 0; j < c.length; j++) {
        if (i === j) continue;
        const x = BigInt(c[i]), y = BigInt(c[j]);
        const v = x * y + x - y;
        if (ans === null || v > ans) ans = v;
      }
    }
    print(ans.toString());
  }
}

solve();
printAll();
