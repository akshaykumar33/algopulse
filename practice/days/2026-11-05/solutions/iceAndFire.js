const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);

let ptr = 0;

function solve() {
  const n = parseInt(tokens[ptr++], 10);

  if (n === 1) {
    return '1';
  }

  const b = new Array(n - 1);
  for (let i = 0; i < n - 1; i++) {
    b[i] = parseInt(tokens[ptr++], 10);
  }

  const out = [];
  out.push(b[0]);
  for (let i = 0; i < n - 2; i++) {
    out.push(Math.min(b[i], b[i + 1]));
  }
  if (n > 1) {
    out.push(b[n - 2]);
  }

  return out.join(' ');
}

const t = parseInt(tokens[ptr++], 10);
const results = [];
for (let i = 0; i < t; i++) {
  results.push(solve());
}

console.log(results.join('\n'));
