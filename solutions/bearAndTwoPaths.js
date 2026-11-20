const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const a = parseInt(input[ptr++], 10);
  const b = parseInt(input[ptr++], 10);
  const c = parseInt(input[ptr++], 10);
  const d = parseInt(input[ptr++], 10);

  if (n === 4 || k < n + 1) {
    console.log(-1);
    return;
  }

  const used = new Uint8Array(n + 1);
  used[a] = 1;
  used[b] = 1;
  used[c] = 1;
  used[d] = 1;

  const others = [];
  for (let i = 1; i <= n; i++) {
    if (!used[i]) others.push(i);
  }

  const p1 = [a, c, ...others, d, b];
  const p2 = [c, a, ...others, b, d];

  console.log(p1.join(' '));
  console.log(p2.join(' '));
}

solve();
