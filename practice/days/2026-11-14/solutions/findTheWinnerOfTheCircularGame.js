var findTheWinner = function(n, k) {
  let ans = 0;
  for (let i = 2; i <= n; i++) {
    ans = (ans + k) % i;
  }
  return ans + 1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(findTheWinner(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = findTheWinner;
