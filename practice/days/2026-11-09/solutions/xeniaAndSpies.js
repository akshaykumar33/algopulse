const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 4 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  let s = parseInt(input[ptr++], 10);
  const f = parseInt(input[ptr++], 10);

  const eventsT = new Int32Array(m);
  const eventsL = new Int32Array(m);
  const eventsR = new Int32Array(m);

  for (let i = 0; i < m; i++) {
    eventsT[i] = parseInt(input[ptr++], 10);
    eventsL[i] = parseInt(input[ptr++], 10);
    eventsR[i] = parseInt(input[ptr++], 10);
  }

  let curT = 1;
  let evIdx = 0;
  const dir = s < f ? 1 : -1;
  const moveChar = s < f ? 'R' : 'L';
  const out = [];

  while (s !== f) {
    while (evIdx < m && eventsT[evIdx] < curT) {
      evIdx++;
    }

    let canMove = true;
    if (evIdx < m && eventsT[evIdx] === curT) {
      const l = eventsL[evIdx];
      const r = eventsR[evIdx];
      const nextS = s + dir;
      if ((s >= l && s <= r) || (nextS >= l && nextS <= r)) {
        canMove = false;
      }
    }

    if (canMove) {
      out.push(moveChar);
      s += dir;
    } else {
      out.push('X');
    }

    curT++;
  }

  console.log(out.join(''));
}

solve();
