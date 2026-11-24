const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const sArr = tokens[ptr++].split('');
    const l = new Int32Array(k);
    for (let i = 0; i < k; i++) l[i] = parseInt(tokens[ptr++], 10) - 1;
    const r = new Int32Array(k);
    for (let i = 0; i < k; i++) r[i] = parseInt(tokens[ptr++], 10) - 1;
    const q = parseInt(tokens[ptr++], 10);
    const diff = new Int32Array(n + 2);
    for (let qi = 0; qi < q; qi++) {
      const x = parseInt(tokens[ptr++], 10) - 1;
      let low = 0, high = k - 1, seg = 0;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (l[mid] <= x) {
          seg = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      const L = l[seg];
      const R = r[seg];
      const a = Math.min(x, L + R - x);
      diff[a]++;
    }
    for (let i = 0; i < k; i++) {
      const L = l[i];
      const R = r[i];
      let cur = 0;
      const mid = Math.floor((L + R) / 2);
      for (let j = L; j <= mid; j++) {
        cur += diff[j];
        if (cur % 2 === 1) {
          const mirror = L + R - j;
          const tmp = sArr[j];
          sArr[j] = sArr[mirror];
          sArr[mirror] = tmp;
        }
      }
    }
    out.push(sArr.join(''));
  }
  console.log(out.join('\n'));
}

solve();
