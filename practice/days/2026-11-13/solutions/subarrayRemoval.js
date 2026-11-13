const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let cnt0 = 0;
    let cnt1 = 0;
    for (let i = 0; i < n; i++) {
      if (input[ptr++] === '0') cnt0++;
      else cnt1++;
    }
    const take = Math.min(cnt0, cnt1);
    let ans = take;
    const rem1 = cnt1 - take;
    ans += Math.floor(rem1 / 3);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

function main() {}

solve();
