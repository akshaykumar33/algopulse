var lexicalOrder = function(n) {
  const res = [];
  let cur = 1;
  for (let i = 0; i < n; i++) {
    res.push(cur);
    if (cur * 10 <= n) {
      cur *= 10;
    } else {
      while (cur % 10 === 9 || cur >= n) {
        cur = Math.floor(cur / 10);
      }
      cur++;
    }
  }
  return res;
};

var solve = function(n) {
  return lexicalOrder(n);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
