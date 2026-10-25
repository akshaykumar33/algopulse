const fs = require('fs');

function isSub(a, b) {
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) i++;
    j++;
  }
  return i === a.length;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let m = input[ptr++];
    let w = input[ptr++];
    if (m.length <= w.length) {
      out.push(isSub(m, w) ? 'YES' : 'NO');
    } else {
      out.push(isSub(w, m) ? 'YES' : 'NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
