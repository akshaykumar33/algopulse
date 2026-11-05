var sampleStats = function(count) {
    let min = -1;
    let max = -1;
    let totalCount = 0;
    let totalSum = 0;
    let mode = 0;
    let maxFreq = 0;

    for (let i = 0; i < 256; i++) {
        if (count[i] > 0) {
            if (min === -1) min = i;
            max = i;
            totalCount += count[i];
            totalSum += i * count[i];
            if (count[i] > maxFreq) {
                maxFreq = count[i];
                mode = i;
            }
        }
    }

    const mean = totalSum / totalCount;

    let m1 = null;
    let m2 = null;
    const target1 = Math.floor((totalCount + 1) / 2);
    const target2 = Math.floor((totalCount + 2) / 2);

    let prefix = 0;
    for (let i = 0; i < 256; i++) {
        prefix += count[i];
        if (m1 === null && prefix >= target1) {
            m1 = i;
        }
        if (m2 === null && prefix >= target2) {
            m2 = i;
        }
    }

    const median = (m1 + m2) / 2;
    return [min, max, mean, median, mode];
};
var solve = typeof sampleStats !== 'undefined' ? sampleStats : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        const result = solve(parsed);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
