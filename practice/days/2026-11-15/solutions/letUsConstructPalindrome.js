const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  function isPal(s, l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  for (let tc = 0; tc < t && ptr < input.length; tc++) {
    const s = input[ptr++];
    let l = 0;
    let r = s.length - 1;
    let possible = true;

    while (l < r) {
      if (s[l] !== s[r]) {
        possible = isPal(s, l + 1, r) || isPal(s, l, r - 1);
        break;
      }
      l++;
      r--;
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
