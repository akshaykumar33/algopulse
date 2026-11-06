var findBestValue = function(arr, target) {
  let low = 0;
  let high = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > high) high = arr[i];
  }

  function getSum(v) {
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
      s += arr[i] > v ? v : arr[i];
    }
    return s;
  }

  let bestVal = 0;
  let bestDiff = 1e9;

  let l = 0;
  let r = high;
  while (l <= r) {
    const mid = (l + r) >> 1;
    const sum = getSum(mid);
    if (sum <= target) {
      bestVal = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  const s1 = getSum(bestVal);
  const s2 = getSum(bestVal + 1);

  if (Math.abs(s2 - target) < Math.abs(s1 - target)) {
    return bestVal + 1;
  }
  return bestVal;
};

var solve = typeof findBestValue !== 'undefined' ? findBestValue : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const target = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(arr, target)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

