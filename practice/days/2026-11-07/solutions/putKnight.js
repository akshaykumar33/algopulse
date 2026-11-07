const fs = require('fs');

function solve() {
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf-8');
  } catch (_) {}
  if (!raw || raw.trim() === '') {
    try {
      raw = fs.readFileSync('input.txt', 'utf-8');
    } catch (_) {}
  }
  const tokens = (raw || '').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  const t = parseInt(tokens[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const n = parseInt(tokens[i], 10);
    out.push((n + 1) % 2);
  }
  const res = out.join('\n');
  try {
    fs.writeFileSync('output.txt', res + '\n');
  } catch (_) {}
  console.log(res);
}

solve();
