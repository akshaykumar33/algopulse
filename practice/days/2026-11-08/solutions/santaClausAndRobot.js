const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const s = input[1];

  let ans = 1;
  let hasL = false;
  let hasR = false;
  let hasU = false;
  let hasD = false;

  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === 'L') {
      if (hasR) {
        ans++;
        hasL = hasR = hasU = hasD = false;
      }
      hasL = true;
    } else if (c === 'R') {
      if (hasL) {
        ans++;
        hasL = hasR = hasU = hasD = false;
      }
      hasR = true;
    } else if (c === 'U') {
      if (hasD) {
        ans++;
        hasL = hasR = hasU = hasD = false;
      }
      hasU = true;
    } else if (c === 'D') {
      if (hasU) {
        ans++;
        hasL = hasR = hasU = hasD = false;
      }
      hasD = true;
    }
  }

  console.log(ans);
}

solve();
