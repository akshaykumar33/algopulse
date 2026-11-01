const fs = require('fs');

function gcd(a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function hasSolution(resSets) {
  const chosen = new Array(resSets.length);
  function backtrack(idx) {
    if (idx === resSets.length) return true;
    const { L, set } = resSets[idx];
    for (let s = 0; s < set.length; s++) {
      const r = set[s];
      let ok = true;
      for (let prev = 0; prev < idx; prev++) {
        const prevL = resSets[prev].L;
        const prevR = chosen[prev];
        const g = gcd(L, prevL);
        if (r % g !== prevR % g) {
          ok = false;
          break;
        }
      }
      if (ok) {
        chosen[idx] = r;
        if (backtrack(idx + 1)) return true;
      }
    }
    return false;
  }
  return backtrack(0);
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
      const r = r0 + tap0.dr[i];
      const c = c0 + tap0.dc[i];
      if (r >= 0 && r < R && c >= 0 && c < C) {
        const cell = r * C + c;
        if (!seen.has(cell)) {
          seen.add(cell);
          candCells.push(cell);
        }
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
          const r = rB + tap.dr[i];
          const c = cB + tap.dc[i];
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
