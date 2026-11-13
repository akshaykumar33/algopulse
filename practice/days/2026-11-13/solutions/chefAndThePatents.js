const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const m = Number(input[ptr++]);
    const x = Number(input[ptr++]);
    const k = Number(input[ptr++]);
    const s = input[ptr++];
    let cntE = 0;
    let cntO = 0;
    for (let i = 0; i < k; i++) {
      if (s[i] === 'E') cntE++;
      else cntO++;
    }
    let done = 0;
    for (let month = 1; month <= m; month++) {
      if (month % 2 === 1) {
        const take = Math.min(x, cntO);
        done += take;
        cntO -= take;
      } else {
        const take = Math.min(x, cntE);
        done += take;
        cntE -= take;
      }
    }
    if (done >= n) {
      out.push('yes');
    } else {
      out.push('no');
    }
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
