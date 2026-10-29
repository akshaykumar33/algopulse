var circularArrayLoop = function(nums) {
  const n = nums.length;
  function nextIndex(i) {
    return ((i + nums[i]) % n + n) % n;
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) continue;
    let slow = i;
    let fast = nextIndex(i);

    while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[nextIndex(fast)] > 0) {
      if (slow === fast) {
        if (slow === nextIndex(slow)) break;
        return true;
      }
      slow = nextIndex(slow);
      fast = nextIndex(nextIndex(fast));
    }

    let curr = i;
    const val = nums[i];
    while (nums[curr] * val > 0) {
      const next = nextIndex(curr);
      nums[curr] = 0;
      curr = next;
    }
  }
  return false;
};

var solve = typeof circularArrayLoop !== 'undefined' ? circularArrayLoop : null;

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
