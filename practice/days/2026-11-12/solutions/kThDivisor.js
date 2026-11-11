const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = Number(tokens[ptr++]);
  const k = Number(tokens[ptr++]);

  let lim = Math.floor(Math.sqrt(n));
  while ((lim + 1) * (lim + 1) <= n) lim++;
  while (lim * lim > n) lim--;

  const step = n % 2 === 0 ? 1 : 2;
  const small = [];
  const large = [];

  for (let i = 1; i <= lim; i += step) {
    if (n % i === 0) {
      small.push(i);
      const d = n / i;
      if (d !== i) {
        large.push(d);
      }
    }
  }

  const total = small.length + large.length;
  if (k > total) {
    console.log(-1);
  } else if (k <= small.length) {
    console.log(small[k - 1]);
  } else {
    console.log(large[large.length - (k - small.length)]);
  }
}

solve();
