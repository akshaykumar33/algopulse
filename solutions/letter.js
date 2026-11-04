const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const s = input[0].trim();
  const n = s.length;

  let totUpper = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] >= 'A' && s[i] <= 'Z') totUpper++;
  }

  let lowerPref = 0;
  let upperSuff = totUpper;
  let minCost = lowerPref + upperSuff;

  for (let i = 0; i < n; i++) {
    if (s[i] >= 'a' && s[i] <= 'z') {
      lowerPref++;
    } else {
      upperSuff--;
    }
    const cost = lowerPref + upperSuff;
    if (cost < minCost) minCost = cost;
  }

  console.log(minCost);
}

solve();
