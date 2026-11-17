const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({ id: i + 1, val: parseInt(tokens[ptr++], 10) });
  }

  arr.sort((x, y) => y.val - x.val);

  const t1 = [];
  const t2 = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      t1.push(arr[i].id);
    } else {
      t2.push(arr[i].id);
    }
  }

  const out = [];
  out.push(t1.length);
  out.push(t1.join(' '));
  out.push(t2.length);
  out.push(t2.join(' '));
  console.log(out.join('\n'));
}

solve();
