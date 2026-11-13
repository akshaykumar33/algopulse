const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    const k = Number(input[ptr++]);
    const n = s.length;
    const inS = new Set(s);

    if (Math.min(n, k) + (26 - n) < n) {
      out.push('NOPE');
      continue;
    }

    const res = [];
    let cov = 0;
    for (let c = 0; c < 26; c++) {
      if (res.length === n) break;
      const ch = String.fromCharCode(97 + c);
      const isOverlap = inS.has(ch) ? 1 : 0;
      if (cov + isOverlap > k) continue;

      let remIn = 0;
      let remOut = 0;
      for (let next = c + 1; next < 26; next++) {
        const nextCh = String.fromCharCode(97 + next);
        if (inS.has(nextCh)) remIn++;
        else remOut++;
      }

      const maxPoss = Math.min(remIn, k - (cov + isOverlap)) + remOut;
      const need = n - (res.length + 1);
      if (maxPoss >= need) {
        res.push(ch);
        cov += isOverlap;
      }
    }
    out.push(res.join(''));
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
