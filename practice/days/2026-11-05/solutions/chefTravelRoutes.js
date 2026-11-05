const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const citySet = new Set();
  for (let i = 0; i < n; i++) {
    citySet.add(tokens[ptr++]);
  }

  const m = parseInt(tokens[ptr++], 10);
  const roads = new Map();
  for (let i = 0; i < m; i++) {
    const c1 = tokens[ptr++];
    const c2 = tokens[ptr++];
    const d = parseInt(tokens[ptr++], 10);
    roads.set(c1 + '#' + c2, d);
  }

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(tokens[ptr++], 10);
    const route = [];
    for (let i = 0; i < k; i++) {
      route.push(tokens[ptr++]);
    }

    const seen = new Set();
    let ok = true;
    for (let i = 0; i < k; i++) {
      const city = route[i];
      if (!citySet.has(city) || seen.has(city)) {
        ok = false;
        break;
      }
      seen.add(city);
    }

    if (!ok) {
      out.push('ERROR');
      continue;
    }

    let total = 0;
    for (let i = 0; i < k - 1; i++) {
      const key = route[i] + '#' + route[i + 1];
      if (!roads.has(key)) {
        ok = false;
        break;
      }
      total += roads.get(key);
    }

    if (ok) {
      out.push(total);
    } else {
      out.push('ERROR');
    }
  }

  console.log(out.join('\n'));
}

solve();
