var maximumPointsYouCanObtainFromCards = function(cardPoints, k) {
    const n = cardPoints.length;
    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += cardPoints[i];
    }
    const windowSize = n - k;
    if (windowSize === 0) return totalSum;
    let currentWindowSum = 0;
    for (let i = 0; i < windowSize; i++) {
        currentWindowSum += cardPoints[i];
    }
    let minWindowSum = currentWindowSum;
    for (let i = windowSize; i < n; i++) {
        currentWindowSum += cardPoints[i] - cardPoints[i - windowSize];
        if (currentWindowSum < minWindowSum) {
            minWindowSum = currentWindowSum;
        }
    }
    return totalSum - minWindowSum;
};
var solve = maximumPointsYouCanObtainFromCards;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const cardPoints = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = solve(cardPoints, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
