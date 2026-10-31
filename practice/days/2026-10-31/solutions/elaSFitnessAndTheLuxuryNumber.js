const fs = require('fs');

function sqrtBig(n) {
  if (n <= 0n) return 0n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  while ((x + 1n) * (x + 1n) <= n) x++;
  while (x * x > n) x--;
  return x;
}

function countLux(n) {
  if (n <= 0n) return 0n;
  const s = sqrtBig(n);
  let res = 3n * (s - 1n);
  if (s * s <= n) res++;
  if (s * s + s <= n) res++;
  if (s * s + 2n * s <= n) res++;
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = BigInt(tokens[ptr++]);
    const r = BigInt(tokens[ptr++]);
    const ans = countLux(r) - countLux(l - 1n);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
