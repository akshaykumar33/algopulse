const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  function countBlocks(s) {
    let cnt = 1;
    for (let i = 1; i < s.length; i++) {
      if (s[i] !== s[i - 1]) cnt++;
    }
    return cnt;
  }

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = input[ptr++];
    const b = input[ptr++];

    if (a === b) {
      out.push('YES');
      continue;
    }

    const bA = countBlocks(a);
    const bB = countBlocks(b);

    if (bA < bB) {
      out.push('NO');
      continue;
    }

    if (bA === bB) {
      out.push(a[0] === b[0] ? 'YES' : 'NO');
      continue;
    }

    if (bB === 1) {
      if (b[0] === '1') {
        out.push(a.includes('1') ? 'YES' : 'NO');
      } else {
        out.push(a.includes('0') ? 'YES' : 'NO');
      }
      continue;
    }

    out.push('YES');
  }
  console.log(out.join('\n'));
}
solve();
