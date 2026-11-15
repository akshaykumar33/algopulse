const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++].split('');
    const target = input[ptr++];

    if (s.join('') === target) {
      out.push(0);
      continue;
    }

    let firstOne = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        firstOne = i;
        break;
      }
    }

    if (firstOne === -1) {
      out.push(-1);
      continue;
    }

    let possible = true;
    for (let i = 0; i < firstOne; i++) {
      if (s[i] !== target[i]) {
        possible = false;
        break;
      }
    }
    if (target[firstOne] !== '1') possible = false;

    if (!possible) {
      out.push(-1);
      continue;
    }

    const ops = [];
    for (let j = firstOne; j < n - 1; j++) {
      if (s[j + 1] === '0') {
        ops.push(j + 1);
        s[j + 1] = '1';
      }
    }

    for (let j = n - 1; j > firstOne; j--) {
      if (s[j] !== target[j]) {
        ops.push(j);
        s[j] = s[j] === '0' ? '1' : '0';
      }
    }

    out.push(ops.length);
    if (ops.length > 0) out.push(ops.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
