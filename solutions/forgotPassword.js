const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const r = parseInt(input[ptr++], 10);
    const map = {};
    for (let i = 0; i < r; i++) {
      const c = input[ptr++];
      const p = input[ptr++];
      map[c] = p;
    }
    const s = input[ptr++];
    let res = '';
    for (let i = 0; i < s.length; i++) {
      res += map[s[i]] !== undefined ? map[s[i]] : s[i];
    }

    let i = 0;
    while (i < res.length && res[i] === '0') i++;
    res = res.slice(i);
    if (res.includes('.')) {
      let j = res.length - 1;
      while (j >= 0 && res[j] === '0') j--;
      res = res.slice(0, j + 1);
      if (res.endsWith('.')) res = res.slice(0, -1);
    }
    if (res === '') res = '0';
    out.push(res);
  }
  console.log(out.join('\n'));
}
solve();