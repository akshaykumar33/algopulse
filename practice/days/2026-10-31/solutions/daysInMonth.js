const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const days = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];

  for (let tc = 0; tc < t; tc++) {
    const w = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++].toLowerCase();

    const cnt = new Array(7).fill(4);
    const startIdx = days.indexOf(s);
    const extra = w - 28;

    for (let i = 0; i < extra; i++) {
      cnt[(startIdx + i) % 7]++;
    }

    out.push(cnt.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

