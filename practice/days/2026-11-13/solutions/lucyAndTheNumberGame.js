const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const freq = new Map();
    const names = new Map();

    for (let i = 0; i < n; i++) {
      const name = input[ptr++];
      const val = Number(input[ptr++]);
      freq.set(val, (freq.get(val) || 0) + 1);
      names.set(val, name);
    }

    let minVal = Infinity;
    let winner = null;

    for (const [val, count] of freq.entries()) {
      if (count === 1 && val < minVal) {
        minVal = val;
        winner = names.get(val);
      }
    }

    out.push(winner !== null ? winner : 'Nobody wins.');
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
