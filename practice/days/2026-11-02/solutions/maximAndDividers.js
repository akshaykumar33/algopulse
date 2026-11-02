const fs = require('fs');

function isOverlucky(num) {
  const str = num.toString();
  return str.includes('4') || str.includes('7');
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let count = 0;
    const limit = Math.floor(Math.sqrt(n));

    for (let i = 1; i <= limit; i++) {
      if (n % i === 0) {
        if (isOverlucky(i)) count++;
        const d = n / i;
        if (d !== i && isOverlucky(d)) count++;
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();

