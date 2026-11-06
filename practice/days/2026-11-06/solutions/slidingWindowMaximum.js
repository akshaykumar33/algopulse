const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let hasT = false;
  const possibleT = parseInt(tokens[0], 10);
  if (!isNaN(possibleT) && possibleT > 0 && possibleT <= 10000) {
    let cur = 1;
    let valid = true;
    for (let tc = 0; tc < possibleT; tc++) {
      if (cur + 2 > tokens.length) {
        valid = false;
        break;
      }
      const n = parseInt(tokens[cur++], 10);
      const x = parseInt(tokens[cur++], 10);
      if (isNaN(n) || isNaN(x) || n < 1 || x < 1) {
        valid = false;
        break;
      }
      cur += n;
      if (cur > tokens.length) {
        valid = false;
        break;
      }
    }
    if (valid && cur === tokens.length) {
      hasT = true;
    }
  }

  let ptr = 0;
  let numTests = 0;
  if (hasT) {
    numTests = parseInt(tokens[ptr++], 10);
  }

  const out = [];
  while (ptr < tokens.length) {
    if (hasT && out.length >= numTests) break;
    if (ptr + 2 > tokens.length) break;
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    if (isNaN(n) || isNaN(x) || n <= 0) break;

    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    if (x <= 0 || x > n) {
      out.push('');
      continue;
    }

    const deque = new Int32Array(n);
    let head = 0;
    let tail = 0;
    const res = [];
    for (let i = 0; i < n; i++) {
      while (tail > head && a[deque[tail - 1]] <= a[i]) {
        tail--;
      }
      deque[tail++] = i;
      if (deque[head] < i - x + 1) {
        head++;
      }
      if (i >= x - 1) {
        res.push(a[deque[head]]);
      }
    }
    out.push(res.join(' '));
  }

  fs.writeSync(1, out.join('\n') + '\n');
  process.exit(0);
}

try {
  solve();
} catch (e) {
  process.exit(0);
}
