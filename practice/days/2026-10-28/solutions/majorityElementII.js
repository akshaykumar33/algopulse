var majorityElement = function(nums) {
  let c1 = 0, c2 = 0;
  let cnt1 = 0, cnt2 = 0;

  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    if (cnt1 > 0 && v === c1) {
      cnt1++;
    } else if (cnt2 > 0 && v === c2) {
      cnt2++;
    } else if (cnt1 === 0) {
      c1 = v;
      cnt1 = 1;
    } else if (cnt2 === 0) {
      c2 = v;
      cnt2 = 1;
    } else {
      cnt1--;
      cnt2--;
    }
  }

  let act1 = 0, act2 = 0;
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    if (cnt1 > 0 && v === c1) act1++;
    else if (cnt2 > 0 && v === c2) act2++;
  }

  const thresh = Math.floor(nums.length / 3);
  const res = [];
  if (cnt1 > 0 && act1 > thresh) res.push(c1);
  if (cnt2 > 0 && act2 > thresh) res.push(c2);
  return res;
};

var solve = function(nums) {
  return majorityElement(nums);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

