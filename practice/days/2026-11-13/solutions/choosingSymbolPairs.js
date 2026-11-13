const fs = require('fs');

function solve() {
  const str = fs.readFileSync(0, 'utf-8').trim();
  if (!str) return;
  const cnt = new Map();
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    cnt.set(ch, (cnt.get(ch) || 0) + 1);
  }
  let ans = 0n;
  for (const c of cnt.values()) {
    ans += BigInt(c) * BigInt(c);
  }
  console.log(ans.toString());
}

solve();
