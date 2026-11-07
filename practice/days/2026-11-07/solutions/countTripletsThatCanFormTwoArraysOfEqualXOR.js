var countTriplets = function(arr) {
  const n = arr.length;
  let ans = 0;
  let cur = 0;
  const count = new Map();
  const sumIdx = new Map();
  
  count.set(0, 1);
  sumIdx.set(0, 0);
  
  for (let i = 0; i < n; i++) {
    cur ^= arr[i];
    const x = i + 1;
    if (count.has(cur)) {
      const c = count.get(cur);
      const s = sumIdx.get(cur);
      ans += c * (x - 1) - s;
      count.set(cur, c + 1);
      sumIdx.set(cur, s + x);
    } else {
      count.set(cur, 1);
      sumIdx.set(cur, x);
    }
  }
  
  return ans;
};

var solve = countTriplets;

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
    console.error(err);
  }
}

module.exports = solve;

