const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let cnt = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[j] === '1') cnt++;
    }

    if (cnt <= k || n < 2 * k) {
      out.push('Alice');
    } else {
      out.push('Bob');
    }
  }

  console.log(out.join('\n'));
}

solve();
