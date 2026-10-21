const solve = () => {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  const n = Number(input[0]);

  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(`${i * 2} ${i * 2 + 1} ${i * 2 + 2}`);
  }
  console.log(out.join('\n'));
};

solve();
