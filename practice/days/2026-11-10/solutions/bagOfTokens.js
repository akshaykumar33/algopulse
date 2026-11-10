var bagOfTokensScore = function(tokens, power) {
  tokens.sort((a, b) => a - b);
  let left = 0;
  let right = tokens.length - 1;
  let score = 0;
  let maxScore = 0;

  while (left <= right) {
    if (power >= tokens[left]) {
      power -= tokens[left++];
      score++;
      if (score > maxScore) maxScore = score;
    } else if (score > 0 && left < right) {
      power += tokens[right--];
      score--;
    } else {
      break;
    }
  }

  return maxScore;
};

var solve = bagOfTokensScore;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
