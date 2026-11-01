const fs = require('fs');

function extgcd(a, b) {
  if (b === 0) return [1, 0, a];
  const [x1, y1, g] = extgcd(b, a % b);
  return [y1, x1 - Math.floor(a / b) * y1, g];
}

function mergeCongruence(r1, m1, r2, m2) {
  const [x0, y0, g] = extgcd(m1, m2);
  if ((r2 - r1) % g !== 0) return null;
  const mod2 = m2 / g;
  let factor = ((r2 - r1) / g) % mod2;
  let x = (x0 % mod2 * factor) % mod2;
  if (x < 0) x += mod2;
  const newM = (m1 / g) * m2;
  const newR = (r1 + m1 * x) % newM;
  return [newR, newM];
}

function hasSolution(resSets) {
  function backtrack(idx, curR, curM) {
    if (idx === resSets.length) return true;
    const { L, set } = resSets[idx];
    for (let s = 0; s < set.length; s++) {
      const r = set[s];
      let merged;
      if (idx === 0) {
        merged = [r, L];
      } else {
        merged = mergeCongruence(curR, curM, r, L);
      }
      if (merged !== null) {
        if (backtrack(idx + 1, merged[0], merged[1])) return true;
      }
    }
    return false;
  }
  return backtrack(0, 0, 1);
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const R = parseInt(tokens[ptr++], 10);
    const C = parseInt(tokens[ptr++], 10);
    const N = parseInt(tokens[ptr++], 10);
    const taps = [];
    for (let k = 0; k < N; k++) {
      const B = parseInt(tokens[ptr++], 10);
      const L = parseInt(tokens[ptr++], 10);
      const dr = [];
      for (let i = 0; i < L; i++) {
        dr.push(parseInt(tokens[ptr++], 10));
      }
      const dc = [];
      for (let i = 0; i < L; i++) {
        dc.push(parseInt(tokens[ptr++], 10));
      }
      taps.push({ B, L, dr, dc });
    }

    const tap0 = taps[0];
    const r0 = Math.floor(tap0.B / C);
    const c0 = tap0.B % C;
    const candCells = [];
    const seen = new Set();
    for (let i = 0; i < tap0.L; i++) {
      const r = ((r0 + tap0.dr[i]) % R + R) % R;
      const c = ((c0 + tap0.dc[i]) % C + C) % C;
      const cell = r * C + c;
      if (!seen.has(cell)) {
        seen.add(cell);
        candCells.push(cell);
      }
    }

    let ans = 0;
    for (let cIdx = 0; cIdx < candCells.length; cIdx++) {
      const P = candCells[cIdx];
      let possible = true;
      const resSets = [];
      for (let k = 0; k < N; k++) {
        const tap = taps[k];
        const rB = Math.floor(tap.B / C);
        const cB = tap.B % C;
        const set = [];
        for (let i = 0; i < tap.L; i++) {
          const r = ((rB + tap.dr[i]) % R + R) % R;
          const c = ((cB + tap.dc[i]) % C + C) % C;
          if (r * C + c === P) {
            set.push(i);
          }
        }
        if (set.length === 0) {
          possible = false;
          break;
        }
        resSets.push({ L: tap.L, set });
      }
      if (possible && hasSolution(resSets)) {
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
