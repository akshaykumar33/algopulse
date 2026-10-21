const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const out = [];
  while (ptr < input.length) {
    if (ptr >= input.length) break;
    const n1 = parseInt(input[ptr++], 10);
    if (isNaN(n1)) break;
    const l1 = [];
    for (let i = 0; i < n1; i++) l1.push(parseInt(input[ptr++], 10));
    if (ptr >= input.length) break;
    const n2 = parseInt(input[ptr++], 10);
    if (isNaN(n2)) break;
    const l2 = [];
    for (let i = 0; i < n2; i++) l2.push(parseInt(input[ptr++], 10));

    let p1 = 0;
    let p2 = 0;
    let carry = 0;
    const res = [];
    while (p1 < n1 || p2 < n2 || carry > 0) {
      let sum = carry;
      if (p1 < n1) sum += l1[p1++];
      if (p2 < n2) sum += l2[p2++];
      res.push(sum % 10);
      carry = Math.floor(sum / 10);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
