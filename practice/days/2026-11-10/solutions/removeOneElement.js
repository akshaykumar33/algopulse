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

  const tokN = nextToken();
  if (!tokN) return;
  const n = parseInt(tokN, 10);

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(nextToken(), 10);
  }

  const left = new Int32Array(n);
  left[0] = 1;
  let ans = 1;

  for (let i = 1; i < n; i++) {
    left[i] = a[i] > a[i - 1] ? left[i - 1] + 1 : 1;
    if (left[i] > ans) {
      ans = left[i];
    }
  }

  const right = new Int32Array(n);
  right[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    right[i] = a[i] < a[i + 1] ? right[i + 1] + 1 : 1;
  }

  for (let i = 1; i < n - 1; i++) {
    if (a[i - 1] < a[i + 1]) {
      const merged = left[i - 1] + right[i + 1];
      if (merged > ans) {
        ans = merged;
      }
    }
  }

  console.log(ans);
}

solve();
