const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let i = 0; i < t; i++) {
    const [d1, t1, m1] = input[idx++].trim().split(/\s+/).map(Number);
    const [d2, t2, m2] = input[idx++].trim().split(/\s+/).map(Number);
    const s1 = d1 + t1 + m1;
    const s2 = d2 + t2 + m2;
    if (s1 > s2) {
      out.push('DRAGON');
    } else if (s1 < s2) {
      out.push('SLOTH');
    } else if (d1 > d2) {
      out.push('DRAGON');
    } else if (d1 < d2) {
      out.push('SLOTH');
    } else if (t1 > t2) {
      out.push('DRAGON');
    } else if (t1 < t2) {
      out.push('SLOTH');
    } else {
      out.push('TIE');
    }
  }
  console.log(out.join('\n'));
}

solve();
