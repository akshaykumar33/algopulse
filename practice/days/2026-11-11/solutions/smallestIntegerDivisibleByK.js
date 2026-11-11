var smallestRepunitDivByK = function(k) {
  if (k % 2 === 0 || k % 5 === 0) return -1;
  let rem = 0;
  for (let len = 1; len <= k; len++) {
    rem = (rem * 10 + 1) % k;
    if (rem === 0) return len;
  }
  return -1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(smallestRepunitDivByK(JSON.parse(line))));
    }
  }
}
