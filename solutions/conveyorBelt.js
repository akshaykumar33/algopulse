const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const p = parseInt(nextToken(), 10) - 1;
    const s = nextToken();

    let costLeft = 0;
    for (let i = 0; i <= p; i++) {
      if (s[i] === 'R') costLeft++;
    }

    let costRight = 0;
    for (let i = p; i < n; i++) {
      if (s[i] === 'L') costRight++;
    }

    out.push(Math.min(costLeft, costRight));
  }

  console.log(out.join('\n'));
}

solve();
