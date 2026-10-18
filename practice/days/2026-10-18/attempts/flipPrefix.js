const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextWord() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextWord();
  if (!tStr) return;
  const t = parseInt(tStr, 10);

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const nStr = nextWord();
    if (!nStr) break;
    const n = parseInt(nStr, 10);
    const s = nextWord();
    if (!s) break;

    let bal = 0;
    let k = 0n;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 48) bal++;
      else bal--;
      if (bal === 0) k++;
    }

    const ans = 1n << k;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
