const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const a = [];
  for (let i = 0; i < n; i++) a.push(BigInt(input[ptr++]));

  if (n === 1) {
    console.log('1 1');
    console.log((-a[0]).toString());
    console.log('1 1\n0');
    console.log('1 1\n0');
    return;
  }

  const nBig = BigInt(n);
  const nMinus1 = BigInt(n - 1);

  console.log('1 ' + (n - 1));
  const op1 = [];
  for (let i = 0; i < n - 1; i++) {
    const addVal = a[i] * nMinus1;
    op1.push(addVal.toString());
    a[i] += addVal;
  }
  console.log(op1.join(' '));

  console.log(n + ' ' + n);
  console.log((-a[n - 1]).toString());
  a[n - 1] = 0n;

  console.log('1 ' + n);
  const op3 = [];
  for (let i = 0; i < n; i++) {
    op3.push((-a[i]).toString());
  }
  console.log(op3.join(' '));
}

solve();
