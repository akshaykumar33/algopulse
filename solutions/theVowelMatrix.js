const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 1000000007;
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    const pos = [];
    for (let i = 0; i < n; i++) {
      if (vowels.has(s[i])) {
        pos.push(i);
      }
    }

    if (pos.length === 0 || pos.length % k !== 0) {
      out.push(0);
      continue;
    }

    let ans = 1;
    for (let j = k; j < pos.length; j += k) {
      const gap = pos[j] - pos[j - 1];
      ans = Number((BigInt(ans) * BigInt(gap)) % BigInt(MOD));
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
