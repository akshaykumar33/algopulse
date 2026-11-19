const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const ds = parseFloat(input[ptr++]);
    const dt = parseFloat(input[ptr++]);
    const d = parseFloat(input[ptr++]);
    const maxDist = ds + dt;
    const minDist = Math.abs(ds - dt);

    if (d >= minDist && d <= maxDist) {
      out.push(0);
    } else if (d > maxDist) {
      out.push(d - maxDist);
    } else {
      out.push(minDist - d);
    }
  }

  console.log(out.join('\n'));
}

solve();
