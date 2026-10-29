const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const v = parseInt(input[ptr++], 10);

    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += parseInt(input[ptr++], 10);
    }

    const totalNeeded = (n + k) * v;
    const diff = totalNeeded - sum;
    if (diff > 0 && diff % k === 0) {
      out.push((diff / k).toString());
    } else {
      out.push('-1');
    }
  }
  console.log(out.join('\n'));
}

solve();
