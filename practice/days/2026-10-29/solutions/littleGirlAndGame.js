const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const s = input[0];
  const freq = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    freq.set(c, (freq.get(c) || 0) + 1);
  }

  let oddCount = 0;
  for (const count of freq.values()) {
    if ((count & 1) === 1) oddCount++;
  }

  if (oddCount === 0 || (oddCount & 1) === 1) {
    console.log('First');
  } else {
    console.log('Second');
  }
}

solve();
