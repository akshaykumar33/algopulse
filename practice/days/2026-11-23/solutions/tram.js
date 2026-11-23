const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length < 7) return;
  const [s, x1, x2, t1, t2, p, d] = input;
  const walkTime = Math.abs(x1 - x2) * t2;
  let cur = p, dir = d, dist = 0, boarded = false;
  while (true) {
    if (cur === x1) boarded = true;
    if (boarded && cur === x2) break;
    if (cur === s) dir = -1;
    else if (cur === 0) dir = 1;
    cur += dir;
    dist++;
  }
  const tramTime = dist * t1;
  console.log(Math.min(walkTime, tramTime));
}

solve();
