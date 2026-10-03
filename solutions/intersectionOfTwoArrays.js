var solve = function(nums1, nums2) {
  let set1 = new Set(nums1);
  let res = new Set();
  for (let x of nums2) {
    if (set1.has(x)) {
      res.add(x);
    }
  }
  return Array.from(res);
};
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let args = [];
      for (const line of lines) {
        try {
          args.push(JSON.parse(line));
        } catch {
          args.push(line);
        }
      }
      if (args.length >= 2) {
        console.log(JSON.stringify(solve(args[0], args[1])));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
