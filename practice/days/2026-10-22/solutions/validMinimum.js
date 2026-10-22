const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  const t = parseInt(lines[0], 10);
  const ans = [];
  for (let i = 1; i <= t; i++) {
    const parts = lines[i].trim().split(/\s+/).map(Number);
    parts.sort((x, y) => x - y);
    if (parts[0] === parts[1]) {
      ans.push('YES');
    } else {
      ans.push('NO');
    }
  }
  console.log(ans.join('\n'));
}

solve();
