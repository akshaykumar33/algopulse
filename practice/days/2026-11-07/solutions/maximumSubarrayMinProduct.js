var maxSumMinProduct = function(nums) {
  const n = nums.length;
  const pref = new BigInt64Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + BigInt(nums[i]);
  }
  const left = new Int32Array(n).fill(-1);
  const right = new Int32Array(n).fill(n);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) left[i] = stack[stack.length - 1];
    stack.push(i);
  }
  stack.length = 0;
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] >= nums[i]) {
      stack.pop();
    }
    if (stack.length > 0) right[i] = stack[stack.length - 1];
    stack.push(i);
  }
  let maxProd = 0n;
  for (let i = 0; i < n; i++) {
    const l = left[i] + 1;
    const r = right[i];
    const sum = pref[r] - pref[l];
    const prod = BigInt(nums[i]) * sum;
    if (prod > maxProd) maxProd = prod;
  }
  return Number(maxProd % 1000000007n);
};

var solve = typeof maxSumMinProduct !== 'undefined' ? maxSumMinProduct : null;

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
module.exports = { maxSumMinProduct, solve };
