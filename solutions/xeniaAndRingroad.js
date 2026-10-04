const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  const [n, m] = lines[0].split(' ').map(Number);
  const tasks = lines[1].split(' ').map(Number);

  let cur = 1;
  let ans = 0;

  for (let i = 0; i < m; i++) {
    const target = tasks[i];
    if (target >= cur) {
      ans += target - cur;
    } else {
      ans += target - cur + n;
    }
    cur = target;
  }

  console.log(ans);
}

solve();
