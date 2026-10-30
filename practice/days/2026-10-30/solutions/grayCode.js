var grayCode = function(n) {
  const size = 1 << n;
  const res = new Int32Array(size);
  for (let i = 0; i < size; i++) {
    res[i] = i ^ (i >> 1);
  }
  return Array.from(res);
};

var solve = function(n) {
  return grayCode(n);
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
