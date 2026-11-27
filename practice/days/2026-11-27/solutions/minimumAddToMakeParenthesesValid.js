var minAddToMakeValid = function(s) {
  let open = 0, add = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') open++;
    else {
      if (open > 0) open--;
      else add++;
    }
  }
  return add + open;
};
var solve = minAddToMakeValid;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minAddToMakeValid;
