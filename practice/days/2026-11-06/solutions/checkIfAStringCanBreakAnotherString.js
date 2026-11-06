var checkIfCanBreak = function(s1, s2) {
  const a1 = s1.split('').sort();
  const a2 = s2.split('').sort();

  let can1 = true;
  let can2 = true;

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] < a2[i]) can1 = false;
    if (a2[i] < a1[i]) can2 = false;
  }

  return can1 || can2;
};

var solve = typeof checkIfCanBreak !== 'undefined' ? checkIfCanBreak : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s1 = JSON.parse(lines[i]);
        const s2 = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(s1, s2)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

