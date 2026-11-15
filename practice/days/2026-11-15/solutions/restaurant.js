const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const orders = [];
  for (let i = 0; i < n; i++) {
    orders.push({ l: parseInt(input[ptr++], 10), r: parseInt(input[ptr++], 10) });
  }

  orders.sort((a, b) => a.r - b.r);

  let ans = 0;
  let curEnd = -1;
  for (let i = 0; i < n; i++) {
    if (orders[i].l > curEnd) {
      ans++;
      curEnd = orders[i].r;
    }
  }

  console.log(ans);
}

solve();
