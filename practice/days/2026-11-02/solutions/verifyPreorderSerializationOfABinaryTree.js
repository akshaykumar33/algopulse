var isValidSerialization = function(preorder) {
  let slots = 1;
  const nodes = preorder.split(',');
  for (let i = 0; i < nodes.length; i++) {
    slots--;
    if (slots < 0) return false;
    if (nodes[i] !== '#') {
      slots += 2;
    }
  }
  return slots === 0;
};
var solve = typeof isValidSerialization !== 'undefined' ? isValidSerialization : null;

// ---------------- LOCAL TEST HARNESS ----------------
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
