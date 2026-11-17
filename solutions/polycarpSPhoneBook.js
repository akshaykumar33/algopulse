const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(tokens[ptr++]);
  }

  const cnt = new Map();
  for (let i = 0; i < n; i++) {
    const s = nums[i];
    const seen = new Set();
    for (let l = 0; l < 9; l++) {
      for (let r = l + 1; r <= 9; r++) {
        seen.add(s.slice(l, r));
      }
    }
    for (const sub of seen) {
      cnt.set(sub, (cnt.get(sub) || 0) + 1);
    }
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    const s = nums[i];
    let best = null;
    for (let len = 1; len <= 9; len++) {
      for (let l = 0; l + len <= 9; l++) {
        const sub = s.slice(l, l + len);
        if (cnt.get(sub) === 1) {
          best = sub;
          break;
        }
      }
      if (best) break;
    }
    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();
