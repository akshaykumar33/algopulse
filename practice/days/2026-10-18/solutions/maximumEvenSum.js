const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1n;
    if (input.charCodeAt(pos) === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10n + BigInt(input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextBigInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0n; tc < t; tc++) {
    let a = nextBigInt();
    let b = nextBigInt();
    if (a === null || b === null) break;

    if (a % 2n === 0n && b % 2n === 1n) {
      out.push('-1');
      continue;
    }

    if (b % 2n === 1n) {
      a = a * b;
      b = 1n;
    } else {
      a = a * (b / 2n);
      b = 2n;
    }

    const sum = a + b;
    if (sum % 2n === 1n) {
      out.push('-1');
    } else {
      out.push(sum.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
