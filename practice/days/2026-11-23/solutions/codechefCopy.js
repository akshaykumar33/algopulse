const fs = require('fs');

function permute(arr, target) {
  const n = arr.length;
  const used = new Uint8Array(n);
  const cur = [];
  let res = null;
  function backtrack() {
    if (res) return;
    if (cur.length === n) {
      res = cur.join('');
      return;
    }
    const pos = cur.length;
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1]) continue;
      if (arr[i] === target[pos]) continue;
      used[i] = 1;
      cur.push(arr[i]);
      backtrack();
      cur.pop();
      used[i] = 0;
    }
  }
  backtrack();
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const target = 'codechef';
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    if (!s) break;
    let valid = true;
    for (let i = 0; i < 8; i++) {
      if (s[i] === target[i]) { valid = false; break; }
    }
    if (valid) {
      out.push(s);
      continue;
    }
    const chars = s.split('').sort();
    const ans = permute(chars, target);
    out.push(ans ? ans : -1);
  }
  console.log(out.join('\n'));
}

solve();
