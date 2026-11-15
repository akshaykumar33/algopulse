const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const pattern = input[ptr++];
  const m = parseInt(input[ptr++], 10);

  const revealed = new Set();
  for (let i = 0; i < n; i++) {
    if (pattern[i] !== '*') revealed.add(pattern[i]);
  }

  const candidates = [];
  for (let i = 0; i < m; i++) {
    const w = input[ptr++];
    if (w.length !== n) continue;
    let match = true;
    for (let j = 0; j < n; j++) {
      if (pattern[j] !== '*') {
        if (w[j] !== pattern[j]) {
          match = false;
          break;
        }
      } else {
        if (revealed.has(w[j])) {
          match = false;
          break;
        }
      }
    }
    if (match) candidates.push(w);
  }

  if (candidates.length === 0) {
    console.log(0);
    return;
  }

  let ans = 0;
  for (let c = 97; c <= 122; c++) {
    const char = String.fromCharCode(c);
    if (revealed.has(char)) continue;
    let inAll = true;
    for (const w of candidates) {
      if (!w.includes(char)) {
        inAll = false;
        break;
      }
    }
    if (inAll) ans++;
  }
  console.log(ans);
}

solve();
