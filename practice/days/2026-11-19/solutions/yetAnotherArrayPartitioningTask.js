const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;

  const n = Number(input[0]);
  const m = Number(input[1]);
  const k = Number(input[2]);

  const items = [];
  for (let i = 0; i < n; i++) {
    items.push({ val: Number(input[3 + i]), idx: i });
  }

  items.sort((a, b) => b.val - a.val);

  const needed = m * k;
  const chosen = new Uint8Array(n);
  let totalSum = 0;

  for (let i = 0; i < needed; i++) {
    totalSum += items[i].val;
    chosen[items[i].idx] = 1;
  }

  const cuts = [];
  let cnt = 0;

  for (let i = 0; i < n; i++) {
    if (chosen[i]) cnt++;
    if (cnt === m && cuts.length < k - 1) {
      cuts.push(i + 1);
      cnt = 0;
    }
  }

  console.log(totalSum);
  console.log(cuts.join(' '));
}

solve();
