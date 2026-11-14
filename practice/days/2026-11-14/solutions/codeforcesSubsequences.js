const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const k = BigInt(input);

  const word = 'codeforces';
  const c = new Array(10).fill(1);

  function product() {
    let p = 1n;
    for (let i = 0; i < 10; i++) p *= BigInt(c[i]);
    return p;
  }

  let idx = 0;
  while (product() < k) {
    c[idx]++;
    idx = (idx + 1) % 10;
  }

  let ans = '';
  for (let i = 0; i < 10; i++) {
    ans += word[i].repeat(c[i]);
  }
  console.log(ans);
}

solve();
