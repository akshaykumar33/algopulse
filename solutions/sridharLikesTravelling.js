const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const nextCity = {};
    const costMap = {};
    const inDeg = {};
    const allCities = new Set();

    for (let i = 0; i < n - 1; i++) {
      const u = input[ptr++];
      const v = input[ptr++];
      const c = input[ptr++];
      nextCity[u] = v;
      costMap[u] = c;
      inDeg[v] = (inDeg[v] || 0) + 1;
      allCities.add(u);
      allCities.add(v);
    }

    let start = null;
    for (const city of allCities) {
      if (!inDeg[city] && nextCity[city]) {
        start = city;
        break;
      }
    }

    let total = 0;
    let cur = start;
    while (cur && nextCity[cur]) {
      const nxt = nextCity[cur];
      const cStr = costMap[cur];
      const num = parseInt(cStr.replace(/[^0-9]/g, ''), 10);
      total += num;
      out.push(cur + " " + nxt + " " + cStr);
      cur = nxt;
    }
    out.push(total + "$");
  }
  console.log(out.join('\n'));
}

solve();
