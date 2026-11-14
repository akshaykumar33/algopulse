var numberOfWeeks = function(milestones) {
  let sum = 0n;
  let max = 0n;
  for (let i = 0; i < milestones.length; i++) {
    const v = BigInt(milestones[i]);
    sum += v;
    if (v > max) max = v;
  }
  const rest = sum - max;
  if (max > rest + 1n) return Number(2n * rest + 1n);
  return Number(sum);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(numberOfWeeks(JSON.parse(l))));
  }
}

module.exports = numberOfWeeks;
