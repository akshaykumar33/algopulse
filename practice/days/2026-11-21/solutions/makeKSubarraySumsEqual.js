function gcd(a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

var makeSubKSumEqual = function(arr, k) {
  const n = arr.length;
  const g = gcd(n, k);
  let ans = 0;
  for (let i = 0; i < g; i++) {
    const group = [];
    for (let j = i; j < n; j += g) group.push(arr[j]);
    group.sort((a, b) => a - b);
    const median = group[Math.floor(group.length / 2)];
    for (const x of group) ans += Math.abs(x - median);
  }
  return ans;
};

var solve = makeSubKSumEqual;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = makeSubKSumEqual;