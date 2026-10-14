const fs = require('fs');

const getXor = (n) => {
  const rem = n % 4;
  if (rem === 0) return n;
  if (rem === 1) return 1;
  if (rem === 2) return n + 1;
  return 0;
};

const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const parts = input[ptr++].trim().split(/\s+/);
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);

    const prefXor = getXor(a - 1);
    if (prefXor === b) {
      out.push(a);
    } else if ((prefXor ^ b) !== a) {
      out.push(a + 1);
    } else {
      out.push(a + 2);
    }
  }

  console.log(out.join('\n'));
};

solve();
