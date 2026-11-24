const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  let k = 0;
  while ((k + 1) * k / 2 <= n) {
    k++;
  }
  const groups = Array.from({ length: k }, () => []);
  let cur = 1;
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      groups[i].push(cur);
      groups[j].push(cur);
      cur++;
    }
  }
  const out = [k.toString()];
  for (let i = 0; i < k; i++) {
    out.push(groups[i].join(' '));
  }
  console.log(out.join('\n'));
}

solve();
