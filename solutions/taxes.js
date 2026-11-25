const fs = require('fs');

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  const n = parseInt(s, 10);
  if (isPrime(n)) {
    console.log(1);
  } else if (n % 2 === 0 || isPrime(n - 2)) {
    console.log(2);
  } else {
    console.log(3);
  }
}

solve();
