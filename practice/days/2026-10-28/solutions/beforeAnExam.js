const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const d = parseInt(input[ptr++], 10);
  const sumTime = parseInt(input[ptr++], 10);

  const minT = [];
  const maxT = [];
  let sumMin = 0;
  let sumMax = 0;

  for (let i = 0; i < d; i++) {
    const mn = parseInt(input[ptr++], 10);
    const mx = parseInt(input[ptr++], 10);
    minT.push(mn);
    maxT.push(mx);
    sumMin += mn;
    sumMax += mx;
  }

  if (sumTime < sumMin || sumTime > sumMax) {
    console.log('NO');
    return;
  }

  console.log('YES');
  let rem = sumTime - sumMin;
  const ans = [...minT];
  for (let i = 0; i < d; i++) {
    const add = Math.min(rem, maxT[i] - minT[i]);
    ans[i] += add;
    rem -= add;
  }

  console.log(ans.join(' '));
}

solve();

