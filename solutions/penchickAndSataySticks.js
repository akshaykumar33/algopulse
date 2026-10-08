const solve = () => {
  const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = Number(input[lineIdx++]);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = Number(input[lineIdx++]);
    const arr = input[lineIdx++].split(' ').map(Number);
    
    out.push(n - 1);
  }

  console.log(out.join('\n'));
};

solve();
