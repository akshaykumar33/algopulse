const fs = require('fs');

const TYPE_MAP = { BG: 0, BR: 1, BY: 2, GR: 3, GY: 4, RY: 5 };
const MASK_MAP = [3, 5, 9, 6, 10, 12];

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const T = parseInt(data[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(data[ptr++], 10);
    const q = parseInt(data[ptr++], 10);
    const tp = new Int32Array(n);
    const msk = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const id = TYPE_MAP[data[ptr++]];
      tp[i] = id;
      msk[i] = MASK_MAP[id];
    }
    const prev = new Int32Array(6 * n);
    const last = new Int32Array(6).fill(-1);
    for (let i = 0; i < n; i++) {
      last[tp[i]] = i;
      const base = i * 6;
      for (let k = 0; k < 6; k++) prev[base + k] = last[k];
    }
    const next = new Int32Array(6 * n);
    const nxtPos = new Int32Array(6).fill(-1);
    for (let i = n - 1; i >= 0; i--) {
      nxtPos[tp[i]] = i;
      const base = i * 6;
      for (let k = 0; k < 6; k++) next[base + k] = nxtPos[k];
    }
    for (let j = 0; j < q; j++) {
      const x = parseInt(data[ptr++], 10) - 1;
      const y = parseInt(data[ptr++], 10) - 1;
      if ((msk[x] & msk[y]) !== 0) {
        out.push(Math.abs(x - y));
      } else {
        let best = 1e9;
        const tx = tp[x];
        const ty = tp[y];
        const base = x * 6;
        for (let k = 0; k < 6; k++) {
          if (k === tx || k === ty) continue;
          const p1 = prev[base + k];
          if (p1 !== -1) {
            const cost = Math.abs(x - p1) + Math.abs(p1 - y);
            if (cost < best) best = cost;
          }
          const p2 = next[base + k];
          if (p2 !== -1) {
            const cost = Math.abs(x - p2) + Math.abs(p2 - y);
            if (cost < best) best = cost;
          }
        }
        out.push(best === 1e9 ? -1 : best);
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
