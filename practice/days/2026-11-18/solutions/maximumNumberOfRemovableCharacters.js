var maximumRemovals = function(s, p, removable) {
  let low = 0;
  let high = removable.length;
  let ans = 0;
  const n = s.length;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const del = new Uint8Array(n);
    for (let i = 0; i < mid; i++) {
      del[removable[i]] = 1;
    }

    let pi = 0;
    for (let i = 0; i < n && pi < p.length; i++) {
      if (!del[i] && s[i] === p[pi]) pi++;
    }

    if (pi === p.length) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
};

var solve = maximumRemovals;

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

module.exports = maximumRemovals;
