const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0] === '') return;
  const n = parseInt(lines[0], 10);
  const cnt = {};
  for (let i = 1; i <= n; i++) {
    const team = lines[i];
    cnt[team] = (cnt[team] || 0) + 1;
  }
  let maxGoals = -1;
  let winner = '';
  for (const team in cnt) {
    if (cnt[team] > maxGoals) {
      maxGoals = cnt[team];
      winner = team;
    }
  }
  console.log(winner);
}

solve();
