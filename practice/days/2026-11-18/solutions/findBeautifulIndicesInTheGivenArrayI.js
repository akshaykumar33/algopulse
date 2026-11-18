var beautifulIndices = function(s, a, b, k) {
  const listA = [];
  const listB = [];

  for (let i = 0; i <= s.length - a.length; i++) {
    if (s.startsWith(a, i)) listA.push(i);
  }
  for (let j = 0; j <= s.length - b.length; j++) {
    if (s.startsWith(b, j)) listB.push(j);
  }

  const ans = [];
  for (let i = 0; i < listA.length; i++) {
    const ai = listA[i];
    let l = 0;
    let r = listB.length - 1;
    let found = false;
    while (l <= r) {
      const mid = (l + r) >> 1;
      if (Math.abs(listB[mid] - ai) <= k) {
        found = true;
        break;
      }
      if (listB[mid] < ai) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    if (found) ans.push(ai);
  }

  return ans;
};

var solve = beautifulIndices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = beautifulIndices;
