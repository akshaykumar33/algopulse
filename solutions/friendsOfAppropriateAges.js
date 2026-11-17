var numFriendRequests = function(ages) {
  const cnt = new Int32Array(121);
  for (let i = 0; i < ages.length; i++) {
    cnt[ages[i]]++;
  }
  let ans = 0;
  for (let a = 15; a <= 120; a++) {
    if (cnt[a] === 0) continue;
    const minB = Math.floor(0.5 * a + 7) + 1;
    for (let b = minB; b <= a; b++) {
      if (b === a) {
        ans += cnt[a] * (cnt[a] - 1);
      } else {
        ans += cnt[a] * cnt[b];
      }
    }
  }
  return ans;
};

var solve = numFriendRequests;

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
