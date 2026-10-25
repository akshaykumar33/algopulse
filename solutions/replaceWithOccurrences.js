const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const groups = new Map();

    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      let list = groups.get(v);
      if (!list) {
        list = [];
        groups.set(v, list);
      }
      list.push(i);
    }

    let possible = true;
    for (const [k, list] of groups.entries()) {
      if (list.length % k !== 0) {
        possible = false;
        break;
      }
    }

    if (!possible) {
      out.push(-1);
      continue;
    }

    const a = new Int32Array(n);
    let curVal = 1;

    for (const [k, list] of groups.entries()) {
      for (let i = 0; i < list.length; i += k) {
        for (let j = 0; j < k; j++) {
          a[list[i + j]] = curVal;
        }
        curVal++;
      }
    }

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
