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
    const x = parseInt(nextToken(), 10);

    let maxVal = 0;
    let singleTime = 0;

    for (let i = 0; i < n; i++) {
      const h = parseInt(nextToken(), 10);
      if (h > maxVal) maxVal = h;
      singleTime += Math.ceil(h / x);
    }

    out.push(Math.min(maxVal, singleTime));
  }

  console.log(out.join('\n'));
}

solve();
