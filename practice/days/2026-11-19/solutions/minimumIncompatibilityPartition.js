const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const nums = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    nums[i] = parseInt(input[ptr++], 10);
  }
  nums.sort();

  const sz = n / k;
  if (sz === 1) {
    console.log(0);
    return;
  }

  const counts = new Map();
  for (let i = 0; i < n; i++) {
    const c = (counts.get(nums[i]) || 0) + 1;
    if (c > k) {
      console.log(-1);
      return;
    }
    counts.set(nums[i], c);
  }

  const validSubsets = [];
  const subsetCosts = [];

  for (let mask = 1; mask < (1 << n); mask++) {
    let bits = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) bits++;
    }
    if (bits !== sz) continue;

    let hasDup = false;
    let minVal = Infinity, maxVal = -Infinity;
    let lastVal = -1;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        if (nums[i] === lastVal) {
          hasDup = true;
          break;
        }
        lastVal = nums[i];
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
      }
    }
    if (!hasDup) {
      validSubsets.push(mask);
      subsetCosts.push(maxVal - minVal);
    }
  }

  const subsetsWithBit = new Array(n);
  for (let i = 0; i < n; i++) subsetsWithBit[i] = [];
  for (let i = 0; i < validSubsets.length; i++) {
    const mask = validSubsets[i];
    const firstBit = Math.clz32(mask & -mask) ? 31 - Math.clz32(mask & -mask) : 0;
    subsetsWithBit[firstBit].push(i);
  }

  const totalStates = 1 << n;
  const dp = new Int32Array(totalStates).fill(-1);
  dp[0] = 0;

  for (let mask = 0; mask < totalStates; mask++) {
    if (dp[mask] === -1) continue;
    let firstUnset = -1;
    for (let i = 0; i < n; i++) {
      if (!((mask >> i) & 1)) {
        firstUnset = i;
        break;
      }
    }
    if (firstUnset === -1) continue;

    const candidates = subsetsWithBit[firstUnset];
    for (let c = 0; c < candidates.length; c++) {
      const idx = candidates[c];
      const sub = validSubsets[idx];
      if ((mask & sub) === 0) {
        const nextMask = mask | sub;
        const nextCost = dp[mask] + subsetCosts[idx];
        if (dp[nextMask] === -1 || nextCost < dp[nextMask]) {
          dp[nextMask] = nextCost;
        }
      }
    }
  }

  console.log(dp[totalStates - 1]);
}

solve();
