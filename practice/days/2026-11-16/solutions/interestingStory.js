const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const words = [];
    for (let i = 0; i < n; i++) {
      words.push(input[ptr++]);
    }
    const letters = ['a', 'b', 'c', 'd', 'e'];
    let maxWords = 0;

    for (const ch of letters) {
      const diffs = new Int32Array(n);
      for (let i = 0; i < n; i++) {
        const w = words[i];
        let cnt = 0;
        for (let j = 0; j < w.length; j++) {
          if (w[j] === ch) cnt++;
        }
        diffs[i] = cnt - (w.length - cnt);
      }
      diffs.sort();
      let sum = 0;
      let count = 0;
      for (let i = n - 1; i >= 0; i--) {
        if (sum + diffs[i] > 0) {
          sum += diffs[i];
          count++;
        } else {
          break;
        }
      }
      if (count > maxWords) maxWords = count;
    }
    out.push(maxWords);
  }
  console.log(out.join('\n'));
}

solve();
