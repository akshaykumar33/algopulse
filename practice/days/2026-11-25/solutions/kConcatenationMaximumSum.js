var kConcatenationMaxSum = function(arr, k) {
  const MOD = 1000000007;
  const n = arr.length;
  let total = 0;
  let cur1 = 0;
  let best1 = 0;
  let pref = 0;
  let maxPref = 0;
  for (let i = 0; i < n; i++) {
    const x = arr[i];
    total += x;
    pref += x;
    if (pref > maxPref) maxPref = pref;
    cur1 = cur1 + x > 0 ? cur1 + x : 0;
    if (cur1 > best1) best1 = cur1;
  }
  if (k === 1) return best1 % MOD;
  let suf = 0;
  let maxSuf = 0;
  for (let i = n - 1; i >= 0; i--) {
    suf += arr[i];
    if (suf > maxSuf) maxSuf = suf;
  }
  let cur2 = cur1;
  let best2 = best1;
  for (let i = 0; i < n; i++) {
    cur2 = cur2 + arr[i] > 0 ? cur2 + arr[i] : 0;
    if (cur2 > best2) best2 = cur2;
  }
  if (total > 0) {
    const ans = Math.max(best2, maxSuf + maxPref + (k - 2) * total);
    return ans % MOD;
  }
  return best2 % MOD;
};

var solve = kConcatenationMaxSum;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const arr = JSON.parse(lines[i]);
      const k = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(kConcatenationMaxSum(arr, k)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = kConcatenationMaxSum;
