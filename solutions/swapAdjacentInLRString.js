var canTransform = function(start, end) {
  if (start.length !== end.length) return false;
  let i = 0, j = 0, n = start.length;
  while (i < n || j < n) {
    while (i < n && start[i] === 'X') i++;
    while (j < n && end[j] === 'X') j++;
    if (i === n || j === n) return i === n && j === n;
    if (start[i] !== end[j]) return false;
    if (start[i] === 'L' && i < j) return false;
    if (start[i] === 'R' && i > j) return false;
    i++;
    j++;
  }
  return true;
};

var solve = canTransform;

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

module.exports = canTransform;