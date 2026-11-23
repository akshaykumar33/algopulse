const fs = require('fs');

function extGcd(a, b) {
  if (b === 0n) return [1n, 0n, a];
  const [x1, y1, g] = extGcd(b, a % b);
  return [y1, x1 - (a / b) * y1, g];
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);
    if (n < m) {
      out.push('-1');
      continue;
    }
    const r = n % m;
    if (r === 0n) {
      out.push('0');
      continue;
    }
    const [x, , g] = extGcd(k, m);
    if (r % g !== 0n) {
      out.push('-1');
      continue;
    }
    const mod = m / g;
    let t0 = ((x % mod) * ((r / g) % mod)) % mod;
    if (t0 < 0n) t0 += mod;
    if (t0 === 0n) t0 += mod;
    if (n - t0 * k >= m) {
      out.push(t0.toString());
    } else {
      out.push('-1');
    }
  }
  console.log(out.join('\n'));
}

solve();
