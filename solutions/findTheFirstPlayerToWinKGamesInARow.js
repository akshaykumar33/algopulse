var findWinningPlayer = function(skills, k) {
  let cur = 0;
  let wins = 0;

  for (let i = 1; i < skills.length; i++) {
    if (skills[cur] > skills[i]) {
      wins++;
    } else {
      cur = i;
      wins = 1;
    }
    if (wins === k) {
      return cur;
    }
  }

  return cur;
};

var solve = findWinningPlayer;

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

module.exports = findWinningPlayer;
