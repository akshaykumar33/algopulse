const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = [];
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    const val = parseInt(tokens[ptr++], 10);
    a.push(val);
    totalSum += val;
  }

  const allZero = a.every((x) => x === 0);
  if (allZero) {
    console.log('NO');
    return;
  }

  if (totalSum !== 0) {
    console.log('YES');
    console.log('1');
    console.log(`1 ${n}`);
    return;
  }

  let firstNonZero = -1;
  for (let i = 0; i < n; i++) {
    if (a[i] !== 0) {
      firstNonZero = i + 1;
      break;
    }
  }

  console.log('YES');
  console.log('2');
  console.log(`1 ${firstNonZero}`);
  console.log(`${firstNonZero + 1} ${n}`);
}

solve();
