const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = nextInt();
    const arr = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      arr[i] = nextInt();
    }

    function check(l, r) {
      if (r - l === 1) {
        return { ops: 0, min: arr[l], max: arr[l] };
      }
      const mid = (l + r) >> 1;
      const left = check(l, mid);
      if (left.ops === -1) return { ops: -1 };
      const right = check(mid, r);
      if (right.ops === -1) return { ops: -1 };

      if (left.max < right.min) {
        return { ops: left.ops + right.ops, min: left.min, max: right.max };
      } else if (right.max < left.min) {
        return { ops: left.ops + right.ops + 1, min: right.min, max: left.max };
      } else {
        return { ops: -1 };
      }
    }

    const res = check(0, m);
    out.push(res.ops);
  }

  console.log(out.join('\n'));
}

solve();
