const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push([parseInt(input[ptr++], 10), i]);
  }

  items.sort((a, b) => b[0] - a[0]);
  const chosen = items.slice(0, k);

  chosen.sort((a, b) => a[0] - b[0]);
  const medIdx = Math.floor((k - 1) / 2);
  const med = chosen[medIdx][0];

  chosen.sort((a, b) => a[1] - b[1]);
  out.push(med);
  out.push(chosen.map(x => x[0]).join(' '));
}
console.log(out.join('\n'));
