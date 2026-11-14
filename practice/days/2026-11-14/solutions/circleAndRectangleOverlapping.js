var checkOverlap = function(radius, xCenter, yCenter, x1, y1, x2, y2) {
  const nearX = Math.max(x1, Math.min(xCenter, x2));
  const nearY = Math.max(y1, Math.min(yCenter, y2));
  const dx = xCenter - nearX;
  const dy = yCenter - nearY;
  return dx * dx + dy * dy <= radius * radius;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 7) {
      console.log(JSON.stringify(checkOverlap(
        JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]),
        JSON.parse(lines[i + 3]), JSON.parse(lines[i + 4]), JSON.parse(lines[i + 5]),
        JSON.parse(lines[i + 6])
      )));
    }
  }
}

module.exports = checkOverlap;
