const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let n = parseInt(input[ptr++], 10);
  let m = parseInt(input[ptr++], 10);
  let c = parseInt(input[ptr++], 10);
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < n; i++) {
    let x = parseInt(input[ptr++], 10);
    let y = parseInt(input[ptr++], 10);
    let p = parseInt(input[ptr++], 10);
    let val = y - m * x - c;
    if (val > 0) sum1 += p;
    else sum2 += p;
  }
  console.log(Math.max(sum1, sum2));
}

solve();
