const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;

  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  let k = BigInt(input[ptr++]);
  const x = BigInt(input[ptr++]);

  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = BigInt(input[ptr++]);
  }

  a.sort((u, v) => (u < v ? -1 : u > v ? 1 : 0));

  let groups = 1n;
  const gaps = [];

  for (let i = 0; i < n - 1; i++) {
    const diff = a[i + 1] - a[i];
    if (diff > x) {
      groups++;
      const req = (diff - 1n) / x;
      gaps.push(req);
    }
  }

  gaps.sort((u, v) => (u < v ? -1 : u > v ? 1 : 0));

  for (let i = 0; i < gaps.length; i++) {
    const req = gaps[i];
    if (k >= req) {
      k -= req;
      groups--;
    } else {
      break;
    }
  }

  console.log(groups.toString());
}

solve();

