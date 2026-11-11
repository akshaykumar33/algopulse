const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const d = parseInt(tokens[ptr++], 10);
    const st = [];
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i) - 48;
      while (st.length > 0 && st[st.length - 1] > c) {
        st.pop();
      }
      if (c < d) st.push(c);
    }
    out.push(st.join('') + String(d).repeat(s.length - st.length));
  }

  console.log(out.join('\n'));
}

solve();
