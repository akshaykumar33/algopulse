const fs = require('fs');

function solve() {
  const dayMap = {
    mon: 0,
    monday: 0,
    tue: 1,
    tues: 1,
    tuesday: 1,
    wed: 2,
    wednesday: 2,
    thu: 3,
    thurs: 3,
    thursday: 3,
    fri: 4,
    friday: 4,
    sat: 5,
    saturday: 5,
    sun: 6,
    sunday: 6,
  };

  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return input.slice(start, pos);
  }

  const tStr = nextToken();
  if (!tStr) return;
  const t = parseInt(tStr, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const w = parseInt(nextToken(), 10);
    const dayName = nextToken().toLowerCase();
    const start = dayMap[dayName];
    const base = Math.floor(w / 7);
    const rem = w % 7;
    const ans = new Array(7).fill(base);
    for (let i = 0; i < rem; i++) {
      ans[(start + i) % 7]++;
    }
    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
