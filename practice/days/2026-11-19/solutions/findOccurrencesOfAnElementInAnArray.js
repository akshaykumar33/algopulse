var occurrencesOfElement = function(nums, queries, x) {
  const pos = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === x) {
      pos.push(i);
    }
  }

  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const q = queries[i];
    if (q >= 1 && q <= pos.length) {
      ans[i] = pos[q - 1];
    } else {
      ans[i] = -1;
    }
  }

  return ans;
};

var solve = occurrencesOfElement;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = occurrencesOfElement;
