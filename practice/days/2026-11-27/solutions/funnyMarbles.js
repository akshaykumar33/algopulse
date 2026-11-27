const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const q = parseInt(tokens[ptr++], 10);
  const bit = new Float64Array(n + 1);
  function add(i, val) {
    for (; i <= n; i += i & -i) bit[i] += val;
  }
  function query(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += bit[i];
    return s;
  }
  for (let i = 1; i <= n; i++) {
    add(i, Number(tokens[ptr++]));
  }
  const out = [];
  for (let qi = 0; qi < q; qi++) {
    const type = tokens[ptr++];
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    if (type === 'S') {
      out.push(Math.round(query(b + 1) - query(a)));
    } else if (type === 'G') {
      add(a + 1, b);
    } else if (type === 'T') {
      add(a + 1, -b);
    }
  }
  console.log(out.join('\n'));
}
