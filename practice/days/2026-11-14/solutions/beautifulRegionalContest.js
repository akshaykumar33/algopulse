const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const groups = [];
    let curVal = nextInt();
    let curCnt = 1;

    for (let i = 1; i < n; i++) {
      const v = nextInt();
      if (v === curVal) {
        curCnt++;
      } else {
        groups.push(curCnt);
        curVal = v;
        curCnt = 1;
      }
    }
    groups.push(curCnt);

    const maxMedals = Math.floor(n / 2);
    const g = groups[0];
    let s = 0;
    let idx = 1;

    while (idx < groups.length && s <= g) {
      s += groups[idx++];
    }

    let b = 0;
    while (idx < groups.length && (g + s + b + groups[idx]) <= maxMedals) {
      b += groups[idx++];
    }

    if (g > 0 && s > g && b > g && (g + s + b) <= maxMedals) {
      out.push(g + ' ' + s + ' ' + b);
    } else {
      out.push('0 0 0');
    }
  }
  console.log(out.join('\n'));
}

solve();
