const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const names = [];

  for (let i = 0; i < n; i++) {
    const f = tokens[ptr++];
    const s = tokens[ptr++];
    names.push(f < s ? [f, s] : [s, f]);
  }

  let last = '';
  for (let i = 0; i < n; i++) {
    const idx = parseInt(tokens[ptr++], 10) - 1;
    const [s1, s2] = names[idx];
    if (s1 > last) {
      last = s1;
    } else if (s2 > last) {
      last = s2;
    } else {
      console.log('NO');
      return;
    }
  }

  console.log('YES');
}

solve();
