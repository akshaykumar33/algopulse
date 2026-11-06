const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (tStr === null) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const s = nextToken();
    const target = nextToken();

    let possible = true;
    const cntS = new Int32Array(26);
    const cntT = new Int32Array(26);

    for (let i = 0; i < n; i++) {
      cntS[s.charCodeAt(i) - 97]++;
      cntT[target.charCodeAt(i) - 97]++;

      if (i < k && i + k >= n) {
        if (s.charCodeAt(i) !== target.charCodeAt(i)) {
          possible = false;
        }
      }
    }

    if (possible) {
      for (let c = 0; c < 26; c++) {
        if (cntS[c] !== cntT[c]) {
          possible = false;
          break;
        }
      }
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

