const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return sign * res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const firstVal = nextInt();
    const target = firstVal - 1;
    let allSame = true;

    for (let i = 2; i <= n; i++) {
      const val = nextInt();
      if (val - i !== target) {
        allSame = false;
      }
    }

    if (allSame) {
      out.push(n.toString());
    } else {
      out.push('1');
    }
  }

  console.log(out.join('\n'));
}

solve();
