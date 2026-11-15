const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const k = parseInt(input[ptr++], 10);
  let target = '<3';
  for (let i = 0; i < k; i++) {
    target += input[ptr++] + '<3';
  }
  const s = input[ptr++];

  let tp = 0;
  for (let i = 0; i < s.length && tp < target.length; i++) {
    if (s[i] === target[tp]) tp++;
  }

  console.log(tp === target.length ? 'yes' : 'no');
}

solve();
