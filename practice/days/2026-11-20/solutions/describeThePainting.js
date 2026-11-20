var splitPainting = function(segments) {
  const diff = new Map();
  const endpoints = new Set();
  for (const [start, end, color] of segments) {
    diff.set(start, (diff.get(start) || 0) + color);
    diff.set(end, (diff.get(end) || 0) - color);
    endpoints.add(start);
    endpoints.add(end);
  }
  const pts = Array.from(endpoints).sort((a, b) => a - b);
  const ans = [];
  let curColor = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    curColor += diff.get(pts[i]) || 0;
    if (curColor > 0) {
      ans.push([pts[i], pts[i + 1], curColor]);
    }
  }
  return ans;
};

var solve = splitPainting;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = splitPainting;