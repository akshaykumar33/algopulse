const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].split(' ').map(Number);
    
    const freq = {};
    for (let j = 0; j < n; j++) {
      const val = arr[j];
      freq[val] = (freq[val] || 0) + 1;
    }

    let possible = true;
    for (const key in freq) {
      const k = parseInt(key, 10);
      if (freq[k] % k !== 0) {
        possible = false;
        break;
      }
    }

    out.push(possible ? "YES" : "NO");
  }

  console.log(out.join('\n'));
}

solve();
