const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  let k = parseInt(input[1], 10);
  const s = input[2];

  const res = [];
  for (let i = 0; i < n; i++) {
    const code = s.charCodeAt(i);
    const distA = code - 97;
    const distZ = 122 - code;

    if (distA >= distZ) {
      const take = Math.min(k, distA);
      res.push(String.fromCharCode(code - take));
      k -= take;
    } else {
      const take = Math.min(k, distZ);
      res.push(String.fromCharCode(code + take));
      k -= take;
    }
  }

  if (k > 0) {
    console.log(-1);
  } else {
    console.log(res.join(''));
  }
}

solve();

