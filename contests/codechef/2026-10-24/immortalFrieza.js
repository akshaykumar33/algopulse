const fs = require('fs');

function solve() {
  const isGood = new Uint8Array(128);
  isGood[102] = 1;
  isGood[114] = 1;
  isGood[105] = 1;
  isGood[101] = 1;
  isGood[122] = 1;
  isGood[97] = 1;

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
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = nextToken();
    if (!s) break;
    let res = '';
    let count = 1;
    let prev = isGood[s.charCodeAt(0)];

    for (let i = 1; i < s.length; i++) {
      const cur = isGood[s.charCodeAt(i)];
      if (cur === prev) {
        count++;
      } else {
        res += count;
        count = 1;
        prev = cur;
      }
    }
    res += count;
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
