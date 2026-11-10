const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = parseInt(tokens[0], 10);
  const k = parseInt(tokens[1], 10);
  const x = parseInt(tokens[2], 10);

  const orig = [];
  for (let i = 0; i < n; i++) {
    orig.push(parseInt(tokens[3 + i], 10));
  }

  let ans = 0;
  for (let pos = 0; pos <= n; pos++) {
    const balls = orig.slice(0, pos).concat([x], orig.slice(pos));
    let l = pos;
    let r = pos;
    let destroyed = 0;

    while (l >= 0 && r < balls.length && balls[l] === balls[r]) {
      const color = balls[l];
      let left = l;
      let right = r;
      while (left >= 0 && balls[left] === color) left--;
      while (right < balls.length && balls[right] === color) right++;

      const count = right - left - 1;
      if (count >= 3) {
        destroyed += count;
        balls.splice(left + 1, count);
        l = left;
        r = left + 1;
      } else {
        break;
      }
    }

    if (destroyed > 0) {
      const current = destroyed - 1;
      if (current > ans) {
        ans = current;
      }
    }
  }

  console.log(ans);
}

solve();
