const fs = require('fs');

const DIRS = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0]
};

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const xe = Number(input[ptr++]);
    const ye = Number(input[ptr++]);
    const dire = input[ptr++];
    const [vex, vey] = DIRS[dire];

    const n = Number(input[ptr++]);
    let minT = Infinity;

    for (let i = 0; i < n; i++) {
      const xa = Number(input[ptr++]);
      const ya = Number(input[ptr++]);
      const dira = input[ptr++];
      const [vax, vay] = DIRS[dira];

      const dx = xa - xe;
      const dy = ya - ye;
      const dvx = vex - vax;
      const dvy = vey - vay;

      if (dvx === 0 && dvy === 0) {
        continue;
      } else if (dvx === 0) {
        if (dx === 0) {
          const cand = dy / dvy;
          if (cand > 0 && cand < minT) minT = cand;
        }
      } else if (dvy === 0) {
        if (dy === 0) {
          const cand = dx / dvx;
          if (cand > 0 && cand < minT) minT = cand;
        }
      } else {
        const tx = dx / dvx;
        const ty = dy / dvy;
        if (tx > 0 && Math.abs(tx - ty) < 1e-9) {
          if (tx < minT) minT = tx;
        }
      }
    }

    if (minT === Infinity) {
      out.push('SAFE');
    } else {
      out.push(minT.toFixed(1));
    }
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
