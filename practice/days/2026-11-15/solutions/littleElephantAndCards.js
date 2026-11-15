const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const front = new Map();
  const back = new Map();
  const colors = new Set();

  for (let i = 0; i < n; i++) {
    const f = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    front.set(f, (front.get(f) || 0) + 1);
    if (f !== b) {
      back.set(b, (back.get(b) || 0) + 1);
    }
    colors.add(f);
    colors.add(b);
  }

  const needed = Math.ceil(n / 2);
  let minFlips = Infinity;

  for (const c of colors) {
    const fCount = front.get(c) || 0;
    const bCount = back.get(c) || 0;
    if (fCount + bCount >= needed) {
      const flips = Math.max(0, needed - fCount);
      if (flips < minFlips) minFlips = flips;
    }
  }

  console.log(minFlips === Infinity ? -1 : minFlips);
}

solve();
