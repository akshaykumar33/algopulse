var decompressRLElist = function(nums) {
  let res = [];
  for (let i = 0; i < nums.length; i += 2) {
    let freq = nums[i];
    let val = nums[i + 1];
    for (let j = 0; j < freq; j++) {
      res.push(val);
    }
  }
  return res;
};
var solve = decompressRLElist;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
