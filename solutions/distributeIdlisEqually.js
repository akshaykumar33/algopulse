const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
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
  let t = parseInt(tStr, 10);
  const out = [];

  while (t--) {
    const n = parseInt(nextToken(), 10);
    const arr = new Int32Array(n);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(nextToken(), 10);
      sum += arr[i];
    }

    if (sum % n !== 0) {
      out.push('-1');
      continue;
    }

    arr.sort();
    let steps = 0;
    while (arr[0] !== arr[n - 1]) {
      const p = arr[n - 1];
      const q = arr[0];
      const r = Math.ceil((p - q) / 2);
      arr[n - 1] -= r;
      arr[0] += r;

      let v = arr[0];
      let j = 0;
      while (j + 1 < n && arr[j + 1] < v) {
        arr[j] = arr[j + 1];
        j++;
      }
      arr[j] = v;

      v = arr[n - 1];
      j = n - 1;
      while (j - 1 >= 0 && arr[j - 1] > v) {
        arr[j] = arr[j - 1];
        j--;
      }
      arr[j] = v;

      steps++;
    }

    out.push(steps.toString());
  }

  console.log(out.join('\n'));
}

solve();
