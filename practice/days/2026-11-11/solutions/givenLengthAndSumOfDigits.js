const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const m = parseInt(tokens[ptr++], 10);
  const s = parseInt(tokens[ptr++], 10);

  if (s === 0) {
    console.log(m === 1 ? '0 0' : '-1 -1');
    return;
  }

  if (s > 9 * m) {
    console.log('-1 -1');
    return;
  }

  const minD = new Array(m).fill(0);
  let rem = s - 1;
  for (let i = m - 1; i >= 1; i--) {
    const d = rem > 9 ? 9 : rem;
    minD[i] = d;
    rem -= d;
  }
  minD[0] = 1 + rem;

  const maxD = new Array(m).fill(0);
  rem = s;
  for (let i = 0; i < m; i++) {
    const d = rem > 9 ? 9 : rem;
    maxD[i] = d;
    rem -= d;
  }

  console.log(minD.join('') + ' ' + maxD.join(''));
}

solve();
