var findMinFibonacciNumbers = function(k) {
  const fib = [1, 1];
  while (fib[fib.length - 1] <= k) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  let ans = 0;
  for (let i = fib.length - 1; i >= 0 && k > 0; i--) {
    if (fib[i] <= k) { k -= fib[i]; ans++; }
  }
  return ans;
};
var solve = findMinFibonacciNumbers;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = findMinFibonacciNumbers;
