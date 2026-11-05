const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += parseInt(tokens[ptr++], 10);
    }
    const ans = Math.max(0, sum - k);
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();
