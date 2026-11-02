const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = [];
  const b = [];

  for (let i = 0; i < n; i++) {
    a.push(parseInt(tokens[ptr++], 10));
    b.push(parseInt(tokens[ptr++], 10));
  }

  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i++) {
    if (x < n && (y >= n || a[x] < b[y])) {
      x++;
    } else {
      y++;
    }
  }

  const half = Math.floor(n / 2);
  const lim1 = Math.max(x, half);
  const lim2 = Math.max(y, half);

  let ans1 = '';
  let ans2 = '';
  for (let i = 0; i < n; i++) {
    ans1 += (i < lim1 ? '1' : '0');
    ans2 += (i < lim2 ? '1' : '0');
  }

  console.log(ans1);
  console.log(ans2);
}

solve();

