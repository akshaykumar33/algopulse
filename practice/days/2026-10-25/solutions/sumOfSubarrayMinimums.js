var sumSubarrayMins = function(arr) {
  const mod = 1000000007;
  const n = arr.length;
  const left = new Int32Array(n);
  const right = new Int32Array(n);
  const st1 = [];
  for (let i = 0; i < n; i++) {
    while (st1.length > 0 && arr[st1[st1.length - 1]] > arr[i]) {
      st1.pop();
    }
    left[i] = st1.length === 0 ? i + 1 : i - st1[st1.length - 1];
    st1.push(i);
  }
  const st2 = [];
  for (let i = n - 1; i >= 0; i--) {
    while (st2.length > 0 && arr[st2[st2.length - 1]] >= arr[i]) {
      st2.pop();
    }
    right[i] = st2.length === 0 ? n - i : st2[st2.length - 1] - i;
    st2.push(i);
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = (ans + Number(BigInt(arr[i]) * BigInt(left[i]) * BigInt(right[i]) % BigInt(mod))) % mod;
  }
  return ans;
};

var solve = sumSubarrayMins;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = sumSubarrayMins;
