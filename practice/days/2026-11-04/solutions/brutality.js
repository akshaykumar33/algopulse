const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
  const s = input[ptr++];

  let total = 0n;
  let i = 0;
  while (i < n) {
    let j = i;
    const vals = [];
    while (j < n && s[j] === s[i]) {
      vals.push(a[j]);
      j++;
    }
    vals.sort((x, y) => y - x);
    const take = Math.min(vals.length, k);
    for (let m = 0; m < take; m++) {
      total += BigInt(vals[m]);
    }
    i = j;
  }

  console.log(total.toString());
}

solve();
