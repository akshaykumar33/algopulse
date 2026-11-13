const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  let sum = parseInt(input[0], 10);
  const limit = parseInt(input[1], 10);

  const buckets = Array.from({ length: 18 }, () => []);

  for (let i = 1; i <= limit; i++) {
    const lb = i & (-i);
    let p = 0;
    while ((1 << p) < lb) p++;
    buckets[p].push(i);
  }

  const chosen = [];

  for (let p = 17; p >= 0; p--) {
    const power = 1 << p;
    while (sum >= power && buckets[p].length > 0) {
      sum -= power;
      chosen.push(buckets[p].pop());
    }
  }

  if (sum === 0) {
    console.log(chosen.length);
    console.log(chosen.join(' '));
  } else {
    console.log('-1');
  }
}

solve();
