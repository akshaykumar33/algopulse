var pathInZigZagTree = function(label) {
  let d = 0;
  while ((1 << (d + 1)) - 1 < label) d++;

  const path = [];
  while (label >= 1) {
    path.push(label);
    const minP = 1 << (d - 1);
    const maxP = (1 << d) - 1;
    label = minP + maxP - Math.floor(label / 2);
    d--;
  }

  return path.reverse();
};

var solve = pathInZigZagTree;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
