const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const events = [];
  for (let i = 0; i < n; i++) {
    const s = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    events.push([s, s + d - 1]);
  }
  events.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let lastEnd = -2;
  for (let i = 0; i < n; i++) {
    if (events[i][0] > lastEnd + 1) {
      count++;
      lastEnd = events[i][1];
    }
  }
  console.log(count);
}
solve();