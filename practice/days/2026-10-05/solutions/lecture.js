const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const dict = new Map();
  for (let i = 0; i < m; i++) {
    const w1 = tokens[ptr++];
    const w2 = tokens[ptr++];
    const shorter = w2.length < w1.length ? w2 : w1;
    dict.set(w1, shorter);
    dict.set(w2, shorter);
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    const word = tokens[ptr++];
    out.push(dict.get(word) || word);
  }

  console.log(out.join(' '));
}

solve();
