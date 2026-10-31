var rand10 = function() {
    let row, col, idx;
    do {
        row = rand7();
        col = rand7();
        idx = col + (row - 1) * 7;
    } while (idx > 40);
    return 1 + (idx - 1) % 10;
};

let counter = 0;
function rand7() {
    const vals = [4, 2, 6, 1, 3, 5, 7];
    return vals[(counter++) % vals.length];
}

var solve = function(n) {
    counter = 0;
    const res = [];
    for (let i = 0; i < n; i++) {
        res.push(rand10());
    }
    return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = rand10;

