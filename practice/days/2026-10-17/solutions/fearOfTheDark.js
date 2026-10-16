const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const dist = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

  for (let i = 0; i < t; i++) {
    const px = parseFloat(tokens[ptr++]);
    const py = parseFloat(tokens[ptr++]);
    const ax = parseFloat(tokens[ptr++]);
    const ay = parseFloat(tokens[ptr++]);
    const bx = parseFloat(tokens[ptr++]);
    const by = parseFloat(tokens[ptr++]);

    const oa = dist(0, 0, ax, ay);
    const ob = dist(0, 0, bx, by);
    const pa = dist(px, py, ax, ay);
    const pb = dist(px, py, bx, by);
    const ab = dist(ax, ay, bx, by);

    const w1 = Math.max(oa, pa);
    const w2 = Math.max(ob, pb);
    const w3 = Math.max(oa, pb, ab / 2);
    const w4 = Math.max(ob, pa, ab / 2);

    const ans = Math.min(w1, w2, w3, w4);
    out.push(ans.toFixed(10));
  }

  console.log(out.join('\n'));
}

solve();
