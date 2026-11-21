var beautifulArray = function(n) {
  let res = [1];
  while (res.length < n) {
    const next = [];
    for (const x of res) if (2 * x - 1 <= n) next.push(2 * x - 1);
    for (const x of res) if (2 * x <= n) next.push(2 * x);
    res = next;
  }
  return res;
};

var solve = beautifulArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = beautifulArray;