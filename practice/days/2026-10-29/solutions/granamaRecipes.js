const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    const r = input[ptr++];

    const cntS = new Int32Array(26);
    const cntR = new Int32Array(26);

    for (let i = 0; i < s.length; i++) {
      cntS[s.charCodeAt(i) - 97]++;
    }
    for (let i = 0; i < r.length; i++) {
      cntR[r.charCodeAt(i) - 97]++;
    }

    let sameSet = true;
    let sameMulti = true;

    for (let i = 0; i < 26; i++) {
      if ((cntS[i] > 0 && cntR[i] === 0) || (cntS[i] === 0 && cntR[i] > 0)) {
        sameSet = false;
      }
      if (cntS[i] !== cntR[i]) {
        sameMulti = false;
      }
    }

    if (sameSet && !sameMulti) {
      out.push('NO');
    } else {
      out.push('YES');
    }
  }

  console.log(out.join('\n'));
}

solve();
