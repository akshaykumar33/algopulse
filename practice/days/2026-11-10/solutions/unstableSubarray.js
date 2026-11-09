const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[pos++], 10);
    }

    arr.sort();

    const bn = BigInt(n);
    let ans = (bn * (bn - 1n)) / 2n;

    let i = 0;
    while (i < n) {
      let j = i + 1;
      while (j < n && arr[j] === arr[i]) j++;
      const cnt = BigInt(j - i);
      ans -= (cnt * (cnt - 1n)) / 2n;
      i = j;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
