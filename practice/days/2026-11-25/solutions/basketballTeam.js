const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const n = parseInt(data[ptr++], 10);
  const m = parseInt(data[ptr++], 10);
  const h = parseInt(data[ptr++], 10);
  let total = 0;
  let sh = 0;
  for (let i = 1; i <= m; i++) {
    const v = parseInt(data[ptr++], 10);
    total += v;
    if (i === h) sh = v;
  }
  if (total < n) {
    console.log(-1);
    return;
  }
  const other = total - sh;
  if (other < n - 1) {
    console.log(1);
    return;
  }
  if (n === 1 || sh === 1) {
    console.log(0);
    return;
  }
  let probFail = 1;
  for (let i = 0; i < n - 1; i++) {
    probFail *= (other - i) / (total - 1 - i);
  }
  console.log((1 - probFail).toFixed(6));
}

solve();
