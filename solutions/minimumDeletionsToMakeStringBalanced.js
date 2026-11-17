var minimumDeletions = function(s) {
  let bCount = 0;
  let ans = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'b') {
      bCount++;
    } else {
      ans = Math.min(ans + 1, bCount);
    }
  }

  return ans;
};

var solve = minimumDeletions;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
