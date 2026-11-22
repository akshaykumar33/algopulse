const fs = require('fs');
function gcd(a, b) {
  while (b > 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let cntNum = 0, sumNum = 0;
    for (let i = 0; i < n; i++) {
      const v = s.charCodeAt(i) - 96;
      if (v > 2 * k) {
        cntNum++;
        sumNum += v;
      }
    }
    let num = k * (n - 2 * cntNum) + sumNum;
    let den = k;
    const g = gcd(Math.abs(num), den);
    num = Math.floor(num / g);
    den = Math.floor(den / g);
    out.push(num + ' ' + den);
  }
  console.log(out.join('\n'));
}
solve();