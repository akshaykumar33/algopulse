var addSpaces = function(s, spaces) {
  const res = [];
  let p = 0;
  for (let i = 0; i < spaces.length; i++) {
    res.push(s.slice(p, spaces[i]));
    p = spaces[i];
  }
  res.push(s.slice(p));
  return res.join(' ');
};

var solve = addSpaces;

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

module.exports = addSpaces;