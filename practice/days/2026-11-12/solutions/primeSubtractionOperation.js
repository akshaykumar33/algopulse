var primeSubOperation = function(nums) {
  let maxV = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxV) maxV = nums[i];
  }
  const isPrime = new Uint8Array(maxV + 1);
  if (maxV >= 2) {
    isPrime.fill(1, 2);
    for (let p = 2; p * p <= maxV; p++) {
      if (isPrime[p]) {
        for (let m = p * p; m <= maxV; m += p) {
          isPrime[m] = 0;
        }
      }
    }
  }
  const prevPrime = new Int32Array(maxV + 1);
  let last = 0;
  for (let i = 1; i <= maxV; i++) {
    prevPrime[i] = last;
    if (isPrime[i]) last = i;
  }

  let prev = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (x <= prev) return false;
    const p = prevPrime[x - prev];
    prev = x - p;
  }
  return true;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(primeSubOperation(JSON.parse(line))));
    }
  }
}

module.exports = primeSubOperation;
