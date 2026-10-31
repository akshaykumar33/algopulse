const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  if (n % 2 === 0) {
    console.log('-1');
    return;
  }

  const a = [];
  const b = [];
  const c = [];

  for (let i = 0; i < n; i++) {
    a.push(i);
    b.push(i);
    c.push((a[i] + b[i]) % n);
  }

  const out = [];
  out.push(a.join(' '));
  out.push(b.join(' '));
  out.push(c.join(' '));
  console.log(out.join('\n'));
}

solve();
