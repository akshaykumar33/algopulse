const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let k = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let wins = 0;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 87) wins++;
    }

    if (wins === 0) {
      const act = Math.min(n, k);
      out.push(act === 0 ? 0 : 2 * act - 1);
      continue;
    }

    let base = 0;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 87) {
        base += (i > 0 && s.charCodeAt(i - 1) === 87) ? 2 : 1;
      }
    }

    const gaps = [];
    let curL = 0;
    let seenW = false;
    let leadingL = 0;

    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 87) {
        if (!seenW) {
          leadingL = curL;
        } else {
          if (curL > 0) gaps.push(curL);
        }
        curL = 0;
        seenW = true;
      } else {
        curL++;
      }
    }

    const trailingL = curL;
    gaps.sort((a, b) => a - b);
    let added = 0;

    for (let i = 0; i < gaps.length; i++) {
      const g = gaps[i];
      if (k >= g) {
        k -= g;
        added += 2 * g + 1;
      } else {
        added += 2 * k;
        k = 0;
        break;
      }
    }

    if (k > 0 && leadingL > 0) {
      const take = Math.min(k, leadingL);
      added += 2 * take;
      k -= take;
    }

    if (k > 0 && trailingL > 0) {
      const take = Math.min(k, trailingL);
      added += 2 * take;
      k -= take;
    }

    out.push(base + added);
  }

  console.log(out.join('\n'));
}

solve();
