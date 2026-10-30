const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let cntR = 0;
    let cntP = 0;
    let cntS = 0;

    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'R') cntR++;
      else if (s[i] === 'P') cntP++;
      else if (s[i] === 'S') cntS++;
    }

    let winChar = 'P';
    let maxCnt = cntR;

    if (cntP > maxCnt) {
      maxCnt = cntP;
      winChar = 'S';
    }
    if (cntS > maxCnt) {
      maxCnt = cntS;
      winChar = 'R';
    }

    out.push(winChar.repeat(s.length));
  }
  console.log(out.join('\n'));
}

solve();
