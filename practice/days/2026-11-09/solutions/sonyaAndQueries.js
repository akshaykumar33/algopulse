const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const counts = new Int32Array(262144);
  const out = [];

  for (let i = 0; i < t; i++) {
    const type = tokens[ptr++];
    const s = tokens[ptr++];
    let mask = 0;
    for (let j = 0; j < s.length; j++) {
      mask = (mask << 1) | ((s.charCodeAt(j) - 48) % 2);
    }

    if (type === '+') {
      counts[mask]++;
    } else if (type === '-') {
      counts[mask]--;
    } else {
      out.push(counts[mask]);
    }
  }

  console.log(out.join('\n'));
}

solve();
