var findRestaurant = function(list1, list2) {
  let map = new Map();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }
  let ans = [];
  let minSum = Infinity;
  for (let j = 0; j < list2.length; j++) {
    if (map.has(list2[j])) {
      let sum = map.get(list2[j]) + j;
      if (sum < minSum) {
        minSum = sum;
        ans = [list2[j]];
      } else if (sum === minSum) {
        ans.push(list2[j]);
      }
    }
  }
  return ans;
};
var solve = findRestaurant;

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
