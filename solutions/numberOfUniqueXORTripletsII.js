var uniqueXorTriplets = function(nums) {
  const n = nums.length;
  const pairXor = new Uint8Array(2048);
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      pairXor[nums[i] ^ nums[j]] = 1;
    }
  }
  const uniqueNums = Array.from(new Set(nums));
  const tripletXor = new Uint8Array(2048);
  for (let p = 0; p < 2048; p++) {
    if (pairXor[p]) {
      for (let i = 0; i < uniqueNums.length; i++) {
        tripletXor[p ^ uniqueNums[i]] = 1;
      }
    }
  }
  let ans = 0;
  for (let i = 0; i < 2048; i++) {
    if (tripletXor[i]) ans++;
  }
  return ans;
};
var solve = uniqueXorTriplets;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = uniqueXorTriplets;