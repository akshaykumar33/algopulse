var minOperations = function(boxes) {
  const n = boxes.length;
  const ans = new Array(n).fill(0);

  let count = 0;
  let ops = 0;
  for (let i = 0; i < n; i++) {
    ans[i] += ops;
    if (boxes[i] === '1') count++;
    ops += count;
  }

  count = 0;
  ops = 0;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] += ops;
    if (boxes[i] === '1') count++;
    ops += count;
  }

  return ans;
};

var solve = typeof minOperations !== 'undefined' ? minOperations : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const boxes = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(boxes)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

