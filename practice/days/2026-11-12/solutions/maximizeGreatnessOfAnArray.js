var maximizeGreatness = function(nums) {
  const a = Int32Array.from(nums).sort();
  const n = a.length;
  let i = 0;
  for (let j = 0; j < n; j++) {
    if (a[j] > a[i]) i++;
  }
  return i;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(maximizeGreatness(JSON.parse(line))));
    }
  }
}

module.exports = maximizeGreatness;
