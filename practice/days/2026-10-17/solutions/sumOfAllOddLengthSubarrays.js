var solve = function(arr) {
  let n = arr.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let cur = 0;
    for (let j = i; j < n; j++) {
      cur += arr[j];
      if ((j - i + 1) % 2 !== 0) {
        sum += cur;
      }
    }
  }
  return sum;
};
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
