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
    const nStr = nextToken();
    if (!nStr) break;
    const n = parseInt(nStr, 10);
    const a = nextToken();
    const b = nextToken();

    const set = new Set();
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) {
        set.add(b[i]);
      }
    }
    out.push(set.size);
  }

  console.log(out.join('\n'));
}

solve();
