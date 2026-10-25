const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const l = [];
    for (let i = 0; i < n; i++) l.push(parseInt(input[idx++], 10));
    const g = [];
    for (let i = 0; i < n; i++) g.push(parseInt(input[idx++], 10));

    let front = true;
    let back = true;
    for (let i = 0; i < n; i++) {
      if (l[i] > g[i]) front = false;
      if (l[i] > g[n - 1 - i]) back = false;
    }

    if (front && back) out.push("both");
    else if (front) out.push("front");
    else if (back) out.push("back");
    else out.push("none");
  }
  console.log(out.join('\n'));
}

solve();
