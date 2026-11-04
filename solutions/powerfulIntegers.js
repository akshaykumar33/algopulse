var powerfulIntegers = function(x, y, bound) {
  const px = [];
  let val = 1;
  while (val < bound) {
    px.push(val);
    if (x === 1) break;
    val *= x;
  }
  if (val <= bound && x === 1 && px.length === 0) px.push(1);

  const py = [];
  val = 1;
  while (val < bound) {
    py.push(val);
    if (y === 1) break;
    val *= y;
  }
  if (val <= bound && y === 1 && py.length === 0) py.push(1);

  const seen = new Set();
  for (let i = 0; i < px.length; i++) {
    for (let j = 0; j < py.length; j++) {
      const sum = px[i] + py[j];
      if (sum <= bound) seen.add(sum);
    }
  }

  return Array.from(seen).sort((a, b) => a - b);
};

var solve = typeof powerfulIntegers !== 'undefined' ? powerfulIntegers : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
