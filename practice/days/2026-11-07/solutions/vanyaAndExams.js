const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 3 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const r = parseInt(tokens[ptr++], 10);
  const avg = parseInt(tokens[ptr++], 10);

  const req = BigInt(n) * BigInt(avg);
  let cur = 0n;
  const exams = [];

  for (let i = 0; i < n; i++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    cur += BigInt(a);
    exams.push({ a, b });
  }

  if (cur >= req) {
    console.log(0);
    return;
  }

  let def = req - cur;
  exams.sort((x, y) => x.b - y.b);

  let essays = 0n;
  for (let i = 0; i < n && def > 0n; i++) {
    const can = BigInt(r - exams[i].a);
    if (can <= 0n) continue;
    const take = can < def ? can : def;
    essays += take * BigInt(exams[i].b);
    def -= take;
  }

  console.log(essays.toString());
}

solve();
