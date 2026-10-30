var getHint = function(secret, guess) {
  let bulls = 0;
  let cows = 0;
  const sCnt = new Int32Array(10);
  const gCnt = new Int32Array(10);

  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      bulls++;
    } else {
      sCnt[secret.charCodeAt(i) - 48]++;
      gCnt[guess.charCodeAt(i) - 48]++;
    }
  }

  for (let d = 0; d < 10; d++) {
    cows += Math.min(sCnt[d], gCnt[d]);
  }

  return bulls + "A" + cows + "B";
};

var solve = function(secret, guess) {
  return getHint(secret, guess);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const secret = JSON.parse(lines[0]);
      const guess = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(secret, guess)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
