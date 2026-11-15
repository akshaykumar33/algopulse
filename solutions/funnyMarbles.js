const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const q = parseInt(input[ptr++], 10);

  const bit = new BigInt64Array(n + 1);

  function add(idx, delta) {
    const d = BigInt(delta);
    for (; idx <= n; idx += idx & -idx) bit[idx] += d;
  }

  function query(idx) {
    let sum = 0n;
    for (; idx > 0; idx -= idx & -idx) sum += bit[idx];
    return sum;
  }

  for (let i = 1; i <= n; i++) {
    add(i, parseInt(input[ptr++], 10));
  }

  const out = [];
  for (let k = 0; k < q; k++) {
    const type = input[ptr++];
    if (type === 'S') {
      const a = parseInt(input[ptr++], 10) + 1;
      const b = parseInt(input[ptr++], 10) + 1;
      out.push((query(b) - query(a - 1)).toString());
    } else if (type === 'G') {
      const a = parseInt(input[ptr++], 10) + 1;
      const x = parseInt(input[ptr++], 10);
      add(a, x);
    } else if (type === 'T') {
      const a = parseInt(input[ptr++], 10) + 1;
      const x = parseInt(input[ptr++], 10);
      add(a, -x);
    }
  }

  console.log(out.join('\n'));
}

solve();
