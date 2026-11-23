const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length === 0 || isNaN(input[0])) return;
  const n = input[0];
  const m = input[1];
  let idx = 2;
  const x = new Int32Array(n);
  const y = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    x[i] = input[idx++];
    y[i] = input[idx++];
  }
  const rods = [];
  for (let i = 0; i < m; i++) rods.push({ len: input[idx++], id: i + 1 });
  const seg = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    seg[i] = Math.abs(x[next] - x[i]) + Math.abs(y[next] - y[i]);
  }
  for (let parity = 0; parity < 2; parity++) {
    const ans = new Int32Array(n).fill(-1);
    const used = new Uint8Array(m);
    let ok = true;
    for (let i = parity; i < n; i += 2) {
      const prev = (i - 1 + n) % n;
      const need = seg[prev] + seg[i];
      let found = -1;
      for (let j = 0; j < m; j++) {
        if (!used[j] && rods[j].len === need) {
          found = j;
          break;
        }
      }
      if (found === -1) { ok = false; break; }
      used[found] = 1;
      ans[i] = rods[found].id;
    }
    if (ok) {
      console.log('YES\n' + ans.join(' '));
      return;
    }
  }
  console.log('NO');
}

solve();
