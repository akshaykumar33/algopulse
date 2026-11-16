var bestTeamScore = function(scores, ages) {
  const n = scores.length;
  const players = new Array(n);
  for (let i = 0; i < n; i++) {
    players[i] = [ages[i], scores[i]];
  }
  players.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

  const dp = new Int32Array(n);
  let ans = 0;

  for (let i = 0; i < n; i++) {
    dp[i] = players[i][1];
    for (let j = 0; j < i; j++) {
      if (players[j][1] <= players[i][1]) {
        if (dp[j] + players[i][1] > dp[i]) {
          dp[i] = dp[j] + players[i][1];
        }
      }
    }
    if (dp[i] > ans) ans = dp[i];
  }
  return ans;
};

var solve = bestTeamScore;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
