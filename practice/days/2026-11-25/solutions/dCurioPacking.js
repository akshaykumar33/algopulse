const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

function nextStr(len) {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  const start = ptr;
  ptr += len;
  return start;
}

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const sIdx = nextStr(n);
    let firstG = -1;
    for (let i = 0; i < n; i++) {
      if (buf[sIdx + i] === 71) {
        firstG = i;
        break;
      }
    }
    if (firstG === -1) {
      out.push('YES');
      continue;
    }
    let totalG = 0;
    let totalI = 0;
    for (let i = firstG; i < n; i++) {
      if (buf[sIdx + i] === 71) totalG++;
      else totalI++;
    }
    if (totalG - 1 <= k) {
      out.push('YES');
      continue;
    }
    let ok = false;
    let gBetween = 0;
    let gAfter = totalG - 1;
    let iAfter = totalI;
    for (let j = firstG + 1; j < n; j++) {
      if (buf[sIdx + j] === 73) {
        iAfter--;
      } else {
        gAfter--;
        if (gBetween <= k) {
          const cap1 = k - gBetween;
          if (gAfter > 0) {
            if (gAfter + 2 * iAfter <= cap1 + k) {
              ok = true;
              break;
            }
          } else {
            if (iAfter <= Math.floor(cap1 / 2) + Math.floor(k / 2)) {
              ok = true;
              break;
            }
          }
        }
        gBetween++;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
}

solve();
console.log(out.join('\n'));
