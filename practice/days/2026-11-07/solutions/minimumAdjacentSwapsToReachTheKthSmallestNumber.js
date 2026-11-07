var getMinSwaps = function(num, k) {
  const nextPerm = (arr) => {
    let i = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
      i--;
    }
    let j = arr.length - 1;
    while (j > i && arr[j] <= arr[i]) {
      j--;
    }
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    let l = i + 1, r = arr.length - 1;
    while (l < r) {
      tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
      l++;
      r--;
    }
  };

  const orig = num.split('');
  const target = num.split('');
  for (let i = 0; i < k; i++) {
    nextPerm(target);
  }

  let swaps = 0;
  const n = orig.length;
  for (let i = 0; i < n; i++) {
    if (orig[i] !== target[i]) {
      let j = i;
      while (j < n && orig[j] !== target[i]) {
        j++;
      }
      while (j > i) {
        const tmp = orig[j];
        orig[j] = orig[j - 1];
        orig[j - 1] = tmp;
        j--;
        swaps++;
      }
    }
  }
  return swaps;
};

var solve = getMinSwaps;
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
