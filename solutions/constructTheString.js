const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);

function solve() {
  let t = parseInt(input[0]);
  let results = [];
  for (let i = 1; i <= t; i++) {
    let [n, a, b] = input[i].split(' ').map(Number);
    let res = '';
    for (let j = 0; j < n; j++) {
      res += String.fromCharCode(97 + (j % b));
    }
    results.push(res);
  }
  process.stdout.write(results.join('\n') + '\n');
}

solve();
