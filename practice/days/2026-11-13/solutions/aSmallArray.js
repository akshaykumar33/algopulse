const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = Number(input[ptr++]);
  const x = Number(input[ptr++]);
  let sum = 0;
  const b = [];
  const factor = (1 / x) - 1;
  for (let i = 0; i < n; i++) {
    const val = Number(input[ptr++]);
    sum += val;
    b.push(val * factor);
  }

  let cur = 0;
  let minSub = 0;
  for (let i = 0; i < n; i++) {
    cur = Math.min(b[i], cur + b[i]);
    minSub = Math.min(minSub, cur);
  }

  const ans = sum + minSub;
  console.log(ans.toFixed(2));
}

function main() {}

solve();
