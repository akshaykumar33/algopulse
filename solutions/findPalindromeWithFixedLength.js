var kthPalindrome = function(queries, intLength) {
  const half = (intLength + 1) >> 1;
  const start = Math.pow(10, half - 1);
  const maxQ = Math.pow(10, half) - start;
  const ans = new Array(queries.length);

  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    if (q > maxQ) {
      ans[i] = -1;
      continue;
    }
    const leftStr = String(start + q - 1);
    let rightStr = '';
    const endIdx = (intLength % 2 === 0) ? leftStr.length - 1 : leftStr.length - 2;
    for (let j = endIdx; j >= 0; j--) {
      rightStr += leftStr[j];
    }
    ans[i] = Number(leftStr + rightStr);
  }

  return ans;
};

var solve = kthPalindrome;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = kthPalindrome;
