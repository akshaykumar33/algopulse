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

  const n = nextInt();
  const m = nextInt();
  if (n === null || m === null) return;

  let minA = Infinity;
  let minIdxA = -1;
  for (let i = 0; i < n; i++) {
    const val = nextInt();
    if (val < minA) {
      minA = val;
      minIdxA = i;
    }
  }

  let maxB = -Infinity;
  let maxIdxB = -1;
  for (let j = 0; j < m; j++) {
    const val = nextInt();
    if (val > maxB) {
      maxB = val;
      maxIdxB = j;
    }
  }

  const out = [];
  for (let j = 0; j < m; j++) {
    out.push(minIdxA + ' ' + j);
  }

  for (let i = 0; i < n; i++) {
    if (i !== minIdxA) {
      out.push(i + ' ' + maxIdxB);
    }
  }

  console.log(out.join('\n'));
}

solve();
