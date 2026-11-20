const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const chars = input[ptr++].split('');

  let dots = 0;
  for (let i = 0; i < n - 1; i++) {
    if (chars[i] === '.' && chars[i + 1] === '.') {
      dots++;
    }
  }

  const out = [];
  for (let q = 0; q < m; q++) {
    const x = parseInt(input[ptr++], 10) - 1;
    const c = input[ptr++];

    if (chars[x] === '.' && c !== '.') {
      if (x > 0 && chars[x - 1] === '.') dots--;
      if (x < n - 1 && chars[x + 1] === '.') dots--;
    } else if (chars[x] !== '.' && c === '.') {
      if (x > 0 && chars[x - 1] === '.') dots++;
      if (x < n - 1 && chars[x + 1] === '.') dots++;
    }
    chars[x] = c;
    out.push(dots);
  }

  console.log(out.join('\n'));
}

solve();
