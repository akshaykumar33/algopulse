const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const counts = { c: 0, o: 0, d: 0, e: 0, h: 0, f: 0 };
    for (let i = 0; i < n; i++) {
      const s = input[ptr++];
      for (let j = 0; j < s.length; j++) {
        const ch = s[j];
        if (counts[ch] !== undefined) counts[ch]++;
      }
    }

    const ans = Math.min(
      Math.floor(counts.c / 2),
      counts.o,
      counts.d,
      Math.floor(counts.e / 2),
      counts.h,
      counts.f
    );
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
