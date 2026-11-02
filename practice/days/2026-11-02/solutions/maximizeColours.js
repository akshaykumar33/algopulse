const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const arr = [
      parseInt(tokens[ptr++], 10),
      parseInt(tokens[ptr++], 10),
      parseInt(tokens[ptr++], 10),
    ];

    let ans = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i] > 0) {
        ans++;
        arr[i]--;
      }
    }

    arr.sort((a, b) => a - b);
    let [a, b, c] = arr;

    if (b > 0 && c > 0) {
      ans++;
      b--;
      c--;
    }
    if (a > 0 && c > 0) {
      ans++;
      a--;
      c--;
    }
    if (a > 0 && b > 0) {
      ans++;
      a--;
      b--;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

