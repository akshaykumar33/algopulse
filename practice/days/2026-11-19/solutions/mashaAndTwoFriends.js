const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  function countColors(r1, c1, r2, c2) {
    if (r1 > r2 || c1 > c2) return { w: 0n, b: 0n };
    const w = r2 - r1 + 1n;
    const h = c2 - c1 + 1n;
    const total = w * h;
    const half = total / 2n;
    if (total % 2n === 0n) return { w: half, b: half };
    if ((r1 + c1) % 2n === 0n) return { w: half + 1n, b: half };
    return { w: half, b: half + 1n };
  }

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);

    const x1 = BigInt(input[ptr++]);
    const y1 = BigInt(input[ptr++]);
    const x2 = BigInt(input[ptr++]);
    const y2 = BigInt(input[ptr++]);

    const x3 = BigInt(input[ptr++]);
    const y3 = BigInt(input[ptr++]);
    const x4 = BigInt(input[ptr++]);
    const y4 = BigInt(input[ptr++]);

    const totalW = countColors(1n, 1n, n, m).w;
    const r1 = countColors(x1, y1, x2, y2);
    const r2 = countColors(x3, y3, x4, y4);

    const ix1 = x1 > x3 ? x1 : x3;
    const iy1 = y1 > y3 ? y1 : y3;
    const ix2 = x2 < x4 ? x2 : x4;
    const iy2 = y2 < y4 ? y2 : y4;

    const inter = countColors(ix1, iy1, ix2, iy2);

    const finalW = totalW + (r1.b - inter.b) - r2.w;
    const finalB = n * m - finalW;

    out.push(finalW.toString() + ' ' + finalB.toString());
  }

  console.log(out.join('\n'));
}

solve();
