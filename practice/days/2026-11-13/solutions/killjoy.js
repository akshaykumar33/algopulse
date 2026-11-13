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
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const x = nextInt();
    let allEqual = true;
    let hasX = false;
    let sumDiff = 0;

    for (let i = 0; i < n; i++) {
      const a = nextInt();
      if (a === x) {
        hasX = true;
      } else {
        allEqual = false;
      }
      sumDiff += (a - x);
    }

    if (allEqual) {
      out.push(0);
    } else if (hasX || sumDiff === 0) {
      out.push(1);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();
