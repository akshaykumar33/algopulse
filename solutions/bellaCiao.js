const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const D = BigInt(input[ptr++]);
    const d = BigInt(input[ptr++]);
    const P = BigInt(input[ptr++]);
    const Q = BigInt(input[ptr++]);

    const k = D / d;
    const rem = D % d;

    const complete = d * k * P + d * Q * ((k * (k - 1n)) / 2n);
    const remaining = rem * (P + k * Q);

    const total = complete + remaining;
    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
