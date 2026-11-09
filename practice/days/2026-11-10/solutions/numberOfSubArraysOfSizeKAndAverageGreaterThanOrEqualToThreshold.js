var numOfSubarrays = function(arr, k, threshold) {
  const target = k * threshold;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let ans = sum >= target ? 1 : 0;

  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];
    if (sum >= target) ans++;
  }

  return ans;
};

var solve = numOfSubarrays;

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
  } catch (err) {}
}

module.exports = solve;
