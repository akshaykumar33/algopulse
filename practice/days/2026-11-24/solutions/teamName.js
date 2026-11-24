const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const word = input[ptr++];
      const c = word[0];
      const suf = word.slice(1);
      if (!map.has(c)) map.set(c, new Set());
      map.get(c).add(suf);
    }

    const chars = Array.from(map.keys());
    let total = 0;
    for (let i = 0; i < chars.length; i++) {
      const s1 = map.get(chars[i]);
      for (let j = i + 1; j < chars.length; j++) {
        const s2 = map.get(chars[j]);
        let common = 0;
        const [small, large] = s1.size <= s2.size ? [s1, s2] : [s2, s1];
        for (const suf of small) {
          if (large.has(suf)) common++;
        }
        total += 2 * (s1.size - common) * (s2.size - common);
      }
    }
    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();
