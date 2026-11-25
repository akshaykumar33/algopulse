const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const v = new Int32Array(n);
    for (let i = 0; i < n; i++) v[i] = nextInt();
    const events = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (v[i] > v[j]) {
          events.push({ u: i, v: j, num: j - i, den: v[i] - v[j] });
        }
      }
    }
    events.sort((a, b) => a.num * b.den - b.num * a.den);
    let mn = n, mx = 1;
    const inf = new Uint8Array(n);
    for (let s = 0; s < n; s++) {
      inf.fill(0);
      inf[s] = 1;
      let idx = 0;
      while (idx < events.length) {
        let end = idx + 1;
        while (end < events.length && events[end].num * events[idx].den === events[idx].num * events[end].den) {
          end++;
        }
        for (let rep = 0; rep < n; rep++) {
          let changed = false;
          for (let k = idx; k < end; k++) {
            const eu = events[k].u, ev = events[k].v;
            if (inf[eu] || inf[ev]) {
              if (!inf[eu] || !inf[ev]) {
                inf[eu] = 1;
                inf[ev] = 1;
                changed = true;
              }
            }
          }
          if (!changed) break;
        }
        idx = end;
      }
      let cnt = 0;
      for (let i = 0; i < n; i++) cnt += inf[i];
      if (cnt < mn) mn = cnt;
      if (cnt > mx) mx = cnt;
    }
    out.push(mn + ' ' + mx);
  }
  console.log(out.join('\n'));
}

solve();
