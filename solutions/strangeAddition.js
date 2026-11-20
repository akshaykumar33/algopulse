const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const k = parseInt(input[ptr++], 10);

  let has0 = false;
  let has100 = false;
  let units = -1;
  let tens = -1;
  let other = -1;

  for (let i = 0; i < k; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v === 0) has0 = true;
    else if (v === 100) has100 = true;
    else if (v >= 1 && v <= 9) units = v;
    else if (v % 10 === 0) tens = v;
    else other = v;
  }

  const res = [];
  if (has0) res.push(0);
  if (has100) res.push(100);
  if (units !== -1) res.push(units);
  if (tens !== -1) res.push(tens);

  if (units === -1 && tens === -1 && other !== -1) {
    res.push(other);
  }

  console.log(res.length);
  console.log(res.join(' '));
}

solve();
