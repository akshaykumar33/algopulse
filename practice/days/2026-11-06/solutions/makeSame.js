const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const s1 = input[ptr++];
    const s2 = input[ptr++];
    const s3 = input[ptr++];

    let c1_1 = 0;
    let c1_2 = 0;
    let c1_3 = 0;
    for (let i = 0; i < n; i++) {
      if (s1[i] === '1') c1_1++;
      if (s2[i] === '1') c1_2++;
      if (s3[i] === '1') c1_3++;
    }

    const total1 = c1_1 + c1_2 + c1_3;
    if (total1 % n !== 0) {
      out.push('-1');
      continue;
    }

    if (total1 === 0 || total1 === 3 * n) {
      out.push('0');
      continue;
    }

    if (total1 === n) {
      const minOps = Math.min(n - c1_1, n - c1_2, n - c1_3);
      out.push(minOps);
    } else {
      const c0_1 = n - c1_1;
      const c0_2 = n - c1_2;
      const c0_3 = n - c1_3;
      const minOps = Math.min(n - c0_1, n - c0_2, n - c0_3);
      out.push(minOps);
    }
  }

  console.log(out.join('\n'));
}

solve();

