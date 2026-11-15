var minimumOperations = function(nums) {
  const n = nums.length;
  if (n <= 1) return 0;

  const count0 = new Map();
  const count1 = new Map();

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) count0.set(nums[i], (count0.get(nums[i]) || 0) + 1);
    else count1.set(nums[i], (count1.get(nums[i]) || 0) + 1);
  }

  function getTop2(map) {
    let top1 = { val: 0, cnt: 0 };
    let top2 = { val: 0, cnt: 0 };
    for (const [val, cnt] of map.entries()) {
      if (cnt > top1.cnt) {
        top2 = top1;
        top1 = { val, cnt };
      } else if (cnt > top2.cnt) {
        top2 = { val, cnt };
      }
    }
    return [top1, top2];
  }

  const [e1, e2] = getTop2(count0);
  const [o1, o2] = getTop2(count1);

  if (e1.val !== o1.val) {
    return n - e1.cnt - o1.cnt;
  }
  return n - Math.max(e1.cnt + o2.cnt, e2.cnt + o1.cnt);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(minimumOperations(JSON.parse(lines[i]))));
    }
  }
}

module.exports = minimumOperations;
