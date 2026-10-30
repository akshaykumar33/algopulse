const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const counts = new Int32Array(26);

    for (let i = 0; i < n; i++) {
      counts[s.charCodeAt(i) - 97]++;
    }

    for (let i = 0; i < q; i++) {
      const c = parseInt(input[ptr++], 10);
      let pending = 0;
      for (let j = 0; j < 26; j++) {
        if (counts[j] > c) {
          pending += counts[j] - c;
        }
      }
      out.push(pending);
    }
  }

  console.log(out.join('\n'));
}

solve();
