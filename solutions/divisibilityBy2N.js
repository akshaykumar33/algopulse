const fs = require('fs');

function count2(num) {
  let cnt = 0;
  while (num > 0 && (num & 1) === 0) {
    cnt++;
    num >>= 1;
  }
  return cnt;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let total = 0;
    for (let i = 0; i < n; i++) {
      let val = parseInt(tokens[ptr++], 10);
      total += count2(val);
    }

    if (total >= n) {
      out.push(0);
      continue;
    }

    const available = [];
    for (let i = 1; i <= n; i++) {
      const c = count2(i);
      if (c > 0) available.push(c);
    }
    available.sort((a, b) => b - a);

    let ops = 0;
    for (const c of available) {
      total += c;
      ops++;
      if (total >= n) break;
    }

    if (total >= n) {
      out.push(ops);
    } else {
      out.push(-1);
    }
  }
  console.log(out.join('\n'));
}

solve();
