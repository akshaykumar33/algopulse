const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const odds = [];
    const evens = [];
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v & 1) odds.push(v);
      else evens.push(v);
    }

    const oc = odds.length;
    const ec = evens.length;
    if (oc <= 1 || (oc % 2 === 1 && ec === 0)) {
      out.push('-1');
    } else if (oc % 2 === 0) {
      out.push(odds.concat(evens).join(' '));
    } else {
      const res = [];
      for (let i = 0; i < oc - 1; i++) res.push(odds[i]);
      res.push(evens[0]);
      res.push(odds[oc - 1]);
      for (let i = 1; i < ec; i++) res.push(evens[i]);
      out.push(res.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
