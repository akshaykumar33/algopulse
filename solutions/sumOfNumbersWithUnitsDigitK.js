var minimumNumbers = function(num, k) {
  if (num === 0) return 0;
  for (let c = 1; c <= 10; c++) {
    if (c * k <= num && (num - c * k) % 10 === 0) return c;
  }
  return -1;
};

var solve = minimumNumbers;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minimumNumbers;