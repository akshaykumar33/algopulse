const fs = require('fs');

function gcd(a, b) {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (!input || input.length === 0 || isNaN(input[0])) return;
  let ptr = 0;
  const n = input[ptr++];
  const arr = input.slice(ptr, ptr + n);

  let g = arr[0];
  let maxVal = arr[0];
  for (let i = 1; i < n; i++) {
    g = gcd(g, arr[i]);
    if (arr[i] > maxVal) maxVal = arr[i];
  }

  const moves = Math.floor(maxVal / g) - n;
  if (moves % 2 === 1) {
    console.log('Alice');
  } else {
    console.log('Bob');
  }
}

solve();
