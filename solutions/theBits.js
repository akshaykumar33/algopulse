const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length < 3) return;

  const n = parseInt(input[0], 10);
  const a = input[1].trim();
  const b = input[2].trim();

  let c00 = 0;
  let c01 = 0;
  let c10 = 0;
  let c11 = 0;

  for (let i = 0; i < n; i++) {
    const ai = a.charCodeAt(i) - 48;
    const bi = b.charCodeAt(i) - 48;
    if (ai === 0 && bi === 0) c00++;
    else if (ai === 0 && bi === 1) c01++;
    else if (ai === 1 && bi === 0) c10++;
    else c11++;
  }

  const ans = c00 * (c10 + c11) + c10 * c01;
  console.log(ans);
}

solve();
