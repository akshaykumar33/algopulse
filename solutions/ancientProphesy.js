const fs = require('fs');

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s || s.length < 10) return;

  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const count = new Map();

  for (let i = 0; i <= s.length - 10; i++) {
    const sub = s.slice(i, i + 10);
    if (sub[2] !== '-' || sub[5] !== '-') continue;
    let ok = true;
    for (let j = 0; j < 10; j++) {
      if (j === 2 || j === 5) continue;
      const code = sub.charCodeAt(j);
      if (code < 48 || code > 57) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;

    const d = parseInt(sub.slice(0, 2), 10);
    const m = parseInt(sub.slice(3, 5), 10);
    const y = parseInt(sub.slice(6, 10), 10);

    if (y >= 2013 && y <= 2015 && m >= 1 && m <= 12 && d >= 1 && d <= daysInMonth[m]) {
      count.set(sub, (count.get(sub) || 0) + 1);
    }
  }

  let bestDate = '';
  let maxCount = -1;
  for (const [date, cnt] of count.entries()) {
    if (cnt > maxCount) {
      maxCount = cnt;
      bestDate = date;
    }
  }

  console.log(bestDate);
}

solve();
