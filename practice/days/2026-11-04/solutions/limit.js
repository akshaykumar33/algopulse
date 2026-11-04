const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const [n, m] = input[0].trim().split(/\s+/).map(Number);
  const a = input[1].trim().split(/\s+/).map(Number);
  const b = input[2].trim().split(/\s+/).map(Number);

  const an = a[0];
  const bm = b[0];

  if (n > m) {
    if ((an > 0 && bm > 0) || (an < 0 && bm < 0)) {
      console.log('Infinity');
    } else {
      console.log('-Infinity');
    }
  } else if (n < m) {
    console.log('0/1');
  } else {
    let num = an;
    let den = bm;
    const g = Math.abs(gcd(num, den));
    num = Math.floor(num / g);
    den = Math.floor(den / g);
    if (den < 0) {
      num = -num;
      den = -den;
    }
    console.log(`${num}/${den}`);
  }
}

solve();

