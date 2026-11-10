const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);

  const maxK = Math.floor((n * n + 1) / 2);
  if (k > maxK) {
    console.log('NO');
    return;
  }

  console.log('YES');
  let rem = k;
  const out = [];
  for (let r = 0; r < n; r++) {
    let row = '';
    for (let c = 0; c < n; c++) {
      if ((r + c) % 2 === 0 && rem > 0) {
        row += 'L';
        rem--;
      } else {
        row += 'S';
      }
    }
    out.push(row);
  }
  console.log(out.join('\n'));
}

solve();

