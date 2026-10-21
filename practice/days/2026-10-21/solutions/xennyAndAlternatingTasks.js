const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (i % 2 === 0) {
        sum1 += val;
      } else {
        sum2 += val;
      }
    }

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      if (i % 2 === 0) {
        sum2 += val;
      } else {
        sum1 += val;
      }
    }

    out.push(Math.min(sum1, sum2));
  }

  console.log(out.join('\n'));
}

main();
