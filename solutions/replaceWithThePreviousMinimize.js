const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let k = parseInt(input[ptr++], 10);
    const s = input[ptr++].split('');
    const p = new Uint8Array(26);
    for (let i = 0; i < 26; i++) p[i] = i;

    function find(x) {
      if (p[x] === x) return x;
      return p[x] = find(p[x]);
    }

    for (let i = 0; i < n; i++) {
      let cur = find(s[i].charCodeAt(0) - 97);
      while (cur > 0) {
        if (k === 0) break;
        const nxt = find(cur - 1);
        p[cur] = nxt;
        cur = nxt;
        k--;
      }
      if (k === 0) break;
    }

    for (let i = 0; i < n; i++) {
      const root = find(s[i].charCodeAt(0) - 97);
      s[i] = String.fromCharCode(root + 97);
    }
    out.push(s.join(''));
  }
  console.log(out.join('\n'));
}

solve();
