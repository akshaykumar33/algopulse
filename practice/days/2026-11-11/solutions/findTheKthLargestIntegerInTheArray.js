var kthLargestNumber = function(nums, k) {
  const arr = nums.slice();
  arr.sort((a, b) => {
    if (a.length !== b.length) return b.length - a.length;
    if (a === b) return 0;
    return a < b ? 1 : -1;
  });
  return arr[k - 1];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === kthLargestNumber.length && !(Array.isArray(parsed[0]) && parsed[0].length === kthLargestNumber.length && parsed.every((p) => Array.isArray(p) && p.length === kthLargestNumber.length))) {
      console.log(JSON.stringify(kthLargestNumber(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(kthLargestNumber(...p)));
      }
    }
  }
}

module.exports = kthLargestNumber;
