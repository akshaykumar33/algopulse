var divideArray = function(nums) {
  const cnt = new Array(501).fill(0);
  for (const n of nums) {
    cnt[n]++;
  }
  for (let i = 0; i < 501; i++) {
    if (cnt[i] % 2 !== 0) return false;
  }
  return true;
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
          const result = Array.isArray(parsed) && divideArray.length > 1 ? divideArray(...parsed) : divideArray(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(divideArray(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = divideArray;
