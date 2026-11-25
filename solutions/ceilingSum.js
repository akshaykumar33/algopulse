const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let neg = false;
  if (buf[ptr] === 45) {
    neg = true;
    ptr++;
  }
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return neg ? -x : x;
}

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const a = nextInt();
    const b = nextInt();
    if (a === b) {
      out.push(0);
    } else if ((b - a) % 2 === 0) {
      out.push((b - a) / 2 + 1);
    } else {
      out.push((b - a + 1) / 2);
    }
  }
}

solve();
console.log(out.join('\n'));
