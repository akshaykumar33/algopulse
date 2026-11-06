const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;

  const a = new Int32Array(n);
  const count = new Map();
  for (let i = 0; i < n; i++) {
    a[i] = nextInt();
    count.set(a[i], (count.get(a[i]) || 0) + 1);
  }

  let maxFreq = 0;
  let targetVal = 0;
  for (const [val, freq] of count.entries()) {
    if (freq > maxFreq) {
      maxFreq = freq;
      targetVal = val;
    }
  }

  let targetPos = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] === targetVal) {
      targetPos = i;
      break;
    }
  }

  const ops = [];

  for (let i = targetPos - 1; i >= 0; i--) {
    if (a[i] < targetVal) {
      ops.push(`1 ${i + 1} ${i + 2}`);
    } else if (a[i] > targetVal) {
      ops.push(`2 ${i + 1} ${i + 2}`);
    }
    a[i] = targetVal;
  }

  for (let i = targetPos + 1; i < n; i++) {
    if (a[i] < targetVal) {
      ops.push(`1 ${i + 1} ${i}`);
    } else if (a[i] > targetVal) {
      ops.push(`2 ${i + 1} ${i}`);
    }
    a[i] = targetVal;
  }

  console.log(ops.length);
  if (ops.length > 0) {
    console.log(ops.join('\n'));
  }
}

solve();

