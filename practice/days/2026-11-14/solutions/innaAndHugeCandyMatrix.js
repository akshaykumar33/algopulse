const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 6) return;
  let ptr = 0;
  let n = parseInt(input[ptr++], 10);
  let m = parseInt(input[ptr++], 10);
  const x = parseInt(input[ptr++], 10) % 4;
  const y = parseInt(input[ptr++], 10) % 2;
  const z = parseInt(input[ptr++], 10) % 4;
  const p = parseInt(input[ptr++], 10);

  const out = [];

  for (let i = 0; i < p; i++) {
    let r = parseInt(input[ptr++], 10);
    let c = parseInt(input[ptr++], 10);
    let curN = n, curM = m;

    for (let rot = 0; rot < x; rot++) {
      const newR = c;
      const newC = curN + 1 - r;
      r = newR;
      c = newC;
      const tmp = curN;
      curN = curM;
      curM = tmp;
    }

    if (y === 1) {
      c = curM + 1 - c;
    }

    for (let rot = 0; rot < (4 - z) % 4; rot++) {
      const newR = c;
      const newC = curN + 1 - r;
      r = newR;
      c = newC;
      const tmp = curN;
      curN = curM;
      curM = tmp;
    }

    out.push(r + ' ' + c);
  }
  console.log(out.join('\n'));
}

solve();
