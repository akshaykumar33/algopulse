const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];

  function canReach(n, m) {
    if (n === m) return true;
    if (n < m || n % 3 !== 0) return false;
    const third = n / 3;
    return canReach(third, m) || canReach(2 * third, m);
  }

  for (let i = 1; i <= t; i++) {
    if (!input[i]) break;
    const [n, m] = input[i].trim().split(/\s+/).map(Number);
    out.push(canReach(n, m) ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
