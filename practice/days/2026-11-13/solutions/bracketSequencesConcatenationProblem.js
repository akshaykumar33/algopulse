const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
  if (pos >= input.length) return;

  let n = 0;
  while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
    n = n * 10 + (input.charCodeAt(pos) - 48);
    pos++;
  }

  const MAX_LEN = 300005;
  const leftCount = new Int32Array(MAX_LEN);
  const rightCount = new Int32Array(MAX_LEN);

  for (let i = 0; i < n; i++) {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    let bal = 0;
    let minPref = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      const code = input.charCodeAt(pos);
      if (code === 40) {
        bal++;
      } else {
        bal--;
      }
      if (bal < minPref) minPref = bal;
      pos++;
    }

    if (minPref >= 0) {
      leftCount[bal]++;
    }
    if (minPref === bal && bal <= 0) {
      rightCount[-bal]++;
    }
  }

  let ans = 0n;
  for (let b = 0; b < MAX_LEN; b++) {
    if (leftCount[b] > 0 && rightCount[b] > 0) {
      ans += BigInt(leftCount[b]) * BigInt(rightCount[b]);
    }
  }

  console.log(ans.toString());
}

solve();
