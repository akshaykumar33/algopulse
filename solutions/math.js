const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  let n = parseInt(input, 10);
  if (n === 1) {
    console.log('1 0');
    return;
  }

  let temp = n;
  let p = 1;
  let maxExp = 0;
  const exps = [];

  for (let d = 2; d * d <= temp; d++) {
    if (temp % d === 0) {
      p *= d;
      let cnt = 0;
      while (temp % d === 0) {
        cnt++;
        temp /= d;
      }
      exps.push(cnt);
      if (cnt > maxExp) maxExp = cnt;
    }
  }
  if (temp > 1) {
    p *= temp;
    exps.push(1);
    if (1 > maxExp) maxExp = 1;
  }

  let k = 1;
  let ops = 0;
  while (k < maxExp) {
    k *= 2;
    ops++;
  }

  let same = true;
  for (const e of exps) {
    if (e !== k) {
      same = false;
      break;
    }
  }

  if (!same) ops++;
  console.log(p + ' ' + ops);
}

solve();
