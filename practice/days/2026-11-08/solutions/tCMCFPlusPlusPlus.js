const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const pos = [];
  const neg = [];
  let zeros = 0;

  for (let i = 0; i < n; i++) {
    const val = parseInt(input[i + 1], 10);
    if (val > 0) pos.push(val);
    else if (val < 0) neg.push(val);
    else zeros++;
  }

  if (n === 1) {
    if (pos.length === 1) console.log(pos[0]);
    else if (neg.length === 1) console.log(neg[0]);
    else console.log(0);
    return;
  }

  neg.sort((x, y) => x - y);

  if (pos.length === 0) {
    if (neg.length <= 1) {
      if (zeros > 0) {
        console.log(0);
        return;
      } else {
        console.log(neg[0]);
        return;
      }
    }
  }

  const res = [];
  for (let i = 0; i < pos.length; i++) res.push(pos[i]);
  const limit = neg.length - (neg.length % 2);
  for (let i = 0; i < limit; i++) res.push(neg[i]);

  console.log(res.join(' '));
}

solve();
