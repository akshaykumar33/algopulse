const fs = require('fs');

function isPal(s) {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    if (isPal(s)) {
      out.push(s);
      continue;
    }

    let c0 = 0;
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
      else c1++;
    }

    if (c0 >= c1) {
      out.push('0'.repeat(c0));
    } else {
      out.push('1'.repeat(c1));
    }
  }

  console.log(out.join('\n'));
}

solve();

