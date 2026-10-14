var relativeSortArray = function(arr1, arr2) {
  let cnt = new Int32Array(1001);
  for (let x of arr1) {
    cnt[x]++;
  }
  let ans = [];
  for (let x of arr2) {
    while (cnt[x] > 0) {
      ans.push(x);
      cnt[x]--;
    }
  }
  for (let i = 0; i <= 1000; i++) {
    while (cnt[i] > 0) {
      ans.push(i);
      cnt[i]--;
    }
  }
  return ans;
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
          const result = Array.isArray(parsed) && relativeSortArray.length > 1 ? relativeSortArray(...parsed) : relativeSortArray(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(relativeSortArray(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = relativeSortArray;
