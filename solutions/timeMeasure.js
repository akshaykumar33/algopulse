const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const byAng = Array.from({ length: 361 }, () => []);
  for (let h = 0; h < 12; h++) {
    const hs = h < 10 ? '0' + h : '' + h;
    for (let m = 0; m < 60; m++) {
      const diff2 = Math.abs(60 * h - 11 * m);
      const ang2 = Math.min(diff2, 720 - diff2);
      const ms = m < 10 ? '0' + m : '' + m;
      byAng[ang2].push(hs + ':' + ms);
    }
  }
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const a = Number(tokens[ptr++]);
    const ang2 = Math.round(2 * a);
    if (ang2 >= 0 && ang2 <= 360 && Math.abs(ang2 * 60 - a * 120) < 1 - 1e-9) {
      const list = byAng[ang2];
      for (let i = 0; i < list.length; i++) out.push(list[i]);
    }
  }
  console.log(out.join('\n'));
}

solve();
