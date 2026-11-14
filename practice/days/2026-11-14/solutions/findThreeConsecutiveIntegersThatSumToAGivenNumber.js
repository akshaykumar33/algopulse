var sumOfThree = function(num) {
  const n = BigInt(num);
  if (n % 3n !== 0n) return [];
  const x = n / 3n;
  return [(x - 1n).toString(), x.toString(), (x + 1n).toString()].map(Number);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(sumOfThree(JSON.parse(l))));
  }
}

module.exports = sumOfThree;
