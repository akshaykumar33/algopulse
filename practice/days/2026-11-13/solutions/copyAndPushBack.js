const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let s = input[ptr++];

    let possible = true;
    while (s.length > 0) {
      if (s.length % 2 === 1) {
        s = s.slice(0, s.length - 1);
      } else {
        const half = s.length / 2;
        if (s.slice(0, half) === s.slice(half)) {
          s = s.slice(0, half);
        } else {
          possible = false;
          break;
        }
      }
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
