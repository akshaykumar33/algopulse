const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const [n, k] = input[lineIdx++].split(' ').map(Number);
    const a = input[lineIdx++].split(' ').map(Number);

    const odds = [];
    for (let i = 0; i < n; i++) {
      if (a[i] % 2 !== 0) {
        odds.push(i + 1);
      }
    }

    if (odds.length < k || (odds.length - k) % 2 !== 0) {
      out.push('NO');
    } else {
      out.push('YES');
      const ans = [];
      for (let i = 0; i < k - 1; i++) {
        ans.push(odds[i]);
      }
      ans.push(n);
      out.push(ans.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
