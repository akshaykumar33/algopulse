function solve() {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const t = parseInt(input[line++]);
  const out = [];

  for (let i = 0; i < t; i++) {
    let [n, m, k] = input[line++].split(' ').map(Number);

    const diff = Math.abs(n - m);

    if (diff <= k) {
      out.push(Math.max(n, m));
    } else {
      out.push(Math.min(n, m) + k);
    }
  }

  console.log(out.join('\n'));
}

solve();
