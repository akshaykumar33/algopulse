const fs = require('fs');

function toMinutes(timeStr, ampm) {
  const parts = timeStr.split(':');
  let hh = Number(parts[0]);
  const mm = Number(parts[1]);
  if (ampm === 'AM') {
    if (hh === 12) hh = 0;
  } else {
    if (hh !== 12) hh += 12;
  }
  return hh * 60 + mm;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const pTime = input[ptr++];
    const pAmpm = input[ptr++];
    const p = toMinutes(pTime, pAmpm);
    const n = Number(input[ptr++]);
    let ans = '';
    for (let i = 0; i < n; i++) {
      const lTime = input[ptr++];
      const lAmpm = input[ptr++];
      const rTime = input[ptr++];
      const rAmpm = input[ptr++];
      const l = toMinutes(lTime, lAmpm);
      const r = toMinutes(rTime, rAmpm);
      if (l <= p && p <= r) {
        ans += '1';
      } else {
        ans += '0';
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
