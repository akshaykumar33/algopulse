const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }

    let totalInv = 0;
    let localInv = 0;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (arr[i] > arr[j]) {
          totalInv++;
        }
      }
      if (i < n - 1 && arr[i] > arr[i + 1]) {
        localInv++;
      }
    }

    if (totalInv === localInv) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();

