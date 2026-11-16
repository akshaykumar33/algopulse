const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const a = input[0];
  const b = input[1];

  let maxD = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a.charCodeAt(i) - 48;
    if (d > maxD) maxD = d;
  }
  for (let i = 0; i < b.length; i++) {
    const d = b.charCodeAt(i) - 48;
    if (d > maxD) maxD = d;
  }

  const base = BigInt(maxD + 1);
  let valA = 0n;
  for (let i = 0; i < a.length; i++) {
    valA = valA * base + BigInt(a.charCodeAt(i) - 48);
  }
  let valB = 0n;
  for (let i = 0; i < b.length; i++) {
    valB = valB * base + BigInt(b.charCodeAt(i) - 48);
  }

  let total = valA + valB;
  let digits = 0;
  if (total === 0n) {
    digits = 1;
  } else {
    while (total > 0n) {
      digits++;
      total /= base;
    }
  }
  console.log(digits);
}

solve();
