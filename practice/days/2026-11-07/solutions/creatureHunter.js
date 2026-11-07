const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const h = parseInt(input[ptr++], 10);

    let one = 0;
    let two = 0;

    for (let i = 0; i < n; i++) {
      const s = parseInt(input[ptr++], 10);
      const d = parseInt(input[ptr++], 10);
      if (s === 1) {
        if (d > one) one = d;
      } else {
        if (d > two) two = d;
      }
    }

    let ans = 2 * h + 1;

    if (one > 0) {
      const cost = Math.ceil(h / one);
      if (cost < ans) ans = cost;
    }

    if (two > 0) {
      const cost = 2 * Math.ceil(h / two);
      if (cost < ans) ans = cost;
    }

    if (one > 0 && two > 0) {
      const rem = h - one;
      const cost = 1 + (rem <= 0 ? 0 : 2 * Math.ceil(rem / two));
      if (cost < ans) ans = cost;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
