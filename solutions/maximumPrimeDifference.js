var maximumPrimeDifference = function(nums) {
  const isPrime = new Uint8Array(101);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  for (let i = 0; i < primes.length; i++) isPrime[primes[i]] = 1;
  let first = -1, last = -1;
  for (let i = 0; i < nums.length; i++) {
    if (isPrime[nums[i]]) {
      if (first === -1) first = i;
      last = i;
    }
  }
  return last - first;
};
var solve = maximumPrimeDifference;
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
module.exports = maximumPrimeDifference;