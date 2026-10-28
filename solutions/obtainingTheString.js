const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const s = input[1].split('');
  const t = input[2].split('');

  const cntS = {};
  const cntT = {};
  for (let i = 0; i < n; i++) {
    cntS[s[i]] = (cntS[s[i]] || 0) + 1;
    cntT[t[i]] = (cntT[t[i]] || 0) + 1;
  }
  for (const c in cntT) {
    if (cntS[c] !== cntT[c]) {
      console.log('-1');
      return;
    }
  }

  const moves = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === t[i]) continue;
    let pos = -1;
    for (let j = i + 1; j < n; j++) {
      if (s[j] === t[i]) {
        pos = j;
        break;
      }
    }
    for (let j = pos - 1; j >= i; j--) {
      const tmp = s[j];
      s[j] = s[j + 1];
      s[j + 1] = tmp;
      moves.push(j + 1);
    }
  }

  console.log(moves.length);
  if (moves.length > 0) {
    console.log(moves.join(' '));
  }
}

solve();

