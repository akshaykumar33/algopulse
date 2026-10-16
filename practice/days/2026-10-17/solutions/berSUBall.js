const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const n = Number(input[ptr++]);
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(Number(input[ptr++]));
  }

  const m = Number(input[ptr++]);
  const b = [];
  for (let i = 0; i < m; i++) {
    b.push(Number(input[ptr++]));
  }

  a.sort((x, y) => x - y);
  b.sort((x, y) => x - y);

  let i = 0;
  let j = 0;
  let ans = 0;

  while (i < n && j < m) {
    if (Math.abs(a[i] - b[j]) <= 1) {
      ans++;
      i++;
      j++;
    } else if (a[i] < b[j]) {
      i++;
    } else {
      j++;
    }
  }

  console.log(ans);
}

solve();
