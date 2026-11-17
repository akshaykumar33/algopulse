var pancakeSort = function(arr) {
  const ans = [];
  const n = arr.length;

  function flip(k) {
    let l = 0;
    let r = k - 1;
    while (l < r) {
      const tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
      l++;
      r--;
    }
  }

  for (let val = n; val >= 1; val--) {
    let p = 0;
    while (p < n && arr[p] !== val) p++;

    if (p === val - 1) continue;

    if (p > 0) {
      ans.push(p + 1);
      flip(p + 1);
    }

    ans.push(val);
    flip(val);
  }

  return ans;
};

var solve = pancakeSort;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
        console.log(JSON.stringify(solve(parsed[0])));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
