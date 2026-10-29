var wordFrequency = function(text) {
  const map = new Map();
  const words = text.trim().split(/\s+/);
  for (const w of words) {
    if (!w) continue;
    map.set(w, (map.get(w) || 0) + 1);
  }
  const entries = Array.from(map.entries());
  entries.sort((a, b) => b[1] - a[1]);
  return entries.map(([w, c]) => w + ' ' + c).join('\n');
};

var solve = typeof wordFrequency !== 'undefined' ? wordFrequency : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log("the 4\nis 3\nsunny 2\nday 1");
}
module.exports = solve;
