const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    const e = parseInt(input[ptr++], 10);

    if ((a + b <= d && c <= e) || (a + c <= d && b <= e) || (b + c <= d && a <= e)) {
      out.push("YES");
    } else {
      out.push("NO");
    }
  }

  console.log(out.join('\n'));
}

solve();
