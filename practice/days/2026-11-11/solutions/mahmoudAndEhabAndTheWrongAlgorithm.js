const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const out = [];

  if (n <= 5) {
    out.push('-1');
  } else {
    out.push('1 2');
    out.push('1 3');
    out.push('1 4');
    for (let i = 5; i <= n; i++) {
      out.push('2 ' + i);
    }
  }

  for (let i = 2; i <= n; i++) {
    out.push('1 ' + i);
  }

  console.log(out.join('\n'));
}

solve();
