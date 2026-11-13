const fs = require('fs');

function solve() {
  let input = '';
  try {
    input = fs.readFileSync(0, 'utf-8');
  } catch (e) {}
  if (!input || input.trim().length === 0) {
    try {
      input = fs.readFileSync('input.txt', 'utf-8');
    } catch (e) {}
  }
  if (!input) return;

  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;

  const daysBeforeMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const count = new Int32Array(1000);

  for (let i = 0; i < n; i++) {
    const m = nextInt();
    const d = nextInt();
    const p = nextInt();
    const t = nextInt();

    const targetDay = daysBeforeMonth[m - 1] + d;
    const startDay = targetDay - t + 200;
    const endDay = targetDay - 1 + 200;

    for (let day = startDay; day <= endDay; day++) {
      count[day] += p;
    }
  }

  let ans = 0;
  for (let i = 0; i < 1000; i++) {
    if (count[i] > ans) ans = count[i];
  }

  try {
    fs.writeFileSync('output.txt', ans + '\n');
  } catch (e) {}

  console.log(ans);
}

solve();
