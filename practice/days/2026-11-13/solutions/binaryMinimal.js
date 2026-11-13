const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let ones = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') ones++;
    }

    if (ones <= k) {
      const len = Math.max(0, n - k);
      out.push('0'.repeat(len));
    } else {
      const arr = s.split('');
      let flipped = 0;
      for (let i = 0; i < n && flipped < k; i++) {
        if (arr[i] === '1') {
          arr[i] = '0';
          flipped++;
        }
      }
      out.push(arr.join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();
function main() {}
