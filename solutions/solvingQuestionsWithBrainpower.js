var mostPoints = function(questions) {
  const n = questions.length;
  const dp = new BigInt64Array(n + 1);

  for (let i = n - 1; i >= 0; i--) {
    const [pts, bp] = questions[i];
    const nxt = i + bp + 1;
    const take = BigInt(pts) + (nxt < n ? dp[nxt] : 0n);
    const skip = dp[i + 1];
    dp[i] = take > skip ? take : skip;
  }

  return Number(dp[0]);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(mostPoints(JSON.parse(lines[i]))));
    }
  }
}

module.exports = mostPoints;
