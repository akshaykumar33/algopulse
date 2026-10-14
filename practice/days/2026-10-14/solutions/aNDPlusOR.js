const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let t = parseInt(tokens[0], 10);
  let out = [];
  for (let i = 1; i <= t && i < tokens.length; i++) {
    out.push('0 ' + tokens[i]);
  }
  console.log(out.join('\n'));
}

solve();
