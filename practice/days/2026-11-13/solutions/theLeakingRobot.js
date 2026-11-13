const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = Number(input[ptr++]);
    const y = Number(input[ptr++]);

    let ok = false;
    if (x > 0 && Math.abs(x % 2) === 1 && y >= -(x - 1) && y <= x + 1) {
      ok = true;
    } else if (x < 0 && Math.abs(x % 2) === 0 && y >= x && y <= -x) {
      ok = true;
    } else if (y > 0 && y % 2 === 0 && x >= -y && x <= y - 1) {
      ok = true;
    } else if (y <= 0 && Math.abs(y % 2) === 0 && x >= y && x <= 1 - y) {
      ok = true;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
