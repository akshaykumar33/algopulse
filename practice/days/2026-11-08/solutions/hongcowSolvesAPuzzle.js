const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);

  let minR = n;
  let maxR = -1;
  let minC = m;
  let maxC = -1;
  let cnt = 0;

  for (let i = 0; i < n; i++) {
    const row = input[2 + i];
    for (let j = 0; j < m; j++) {
      if (row[j] === 'X') {
        cnt++;
        if (i < minR) minR = i;
        if (i > maxR) maxR = i;
        if (j < minC) minC = j;
        if (j > maxC) maxC = j;
      }
    }
  }

  const area = (maxR - minR + 1) * (maxC - minC + 1);
  if (cnt === area) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
