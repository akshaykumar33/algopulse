const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const set = new Set();

  for (let i = 0; i < n; i++) {
    let s = tokens[ptr++];
    s = s.replaceAll('u', 'oo');
    while (s.includes('kh')) {
      s = s.replaceAll('kh', 'h');
    }
    set.add(s);
  }

  console.log(set.size);
}

solve();

