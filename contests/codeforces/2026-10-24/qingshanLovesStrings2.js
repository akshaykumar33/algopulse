const fs = require('fs');

function solve() {
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
    const n = parseInt(nextToken(), 10);
    const s = nextToken();
    if (n % 2 !== 0) {
      out.push(-1);
      continue;
    }
    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 48) c0++;
      else c1++;
    }
    if (c0 !== c1) {
      out.push(-1);
      continue;
    }

    const a = s.split('');
    const ops = [];
    let left = 0;
    let right = a.length - 1;

    while (left < right) {
      if (a[left] !== a[right]) {
        left++;
        right--;
      } else if (a[left] === '0') {
        ops.push(right + 1);
        a.splice(right + 1, 0, '0', '1');
        right += 2;
        left++;
        right--;
      } else {
        ops.push(left);
        a.splice(left, 0, '0', '1');
        right += 2;
        left++;
        right--;
      }
    }

    out.push(ops.length);
    if (ops.length > 0) {
      out.push(ops.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
