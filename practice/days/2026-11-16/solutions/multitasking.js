const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);

  const ops = [];
  if (k === 0) {
    for (let i = 1; i <= m; i++) {
      for (let j = i + 1; j <= m; j++) {
        ops.push(i + ' ' + j);
      }
    }
  } else {
    for (let i = 1; i <= m; i++) {
      for (let j = i + 1; j <= m; j++) {
        ops.push(j + ' ' + i);
      }
    }
  }

  console.log(ops.length);
  if (ops.length > 0) {
    console.log(ops.join('\n'));
  }
}

solve();
