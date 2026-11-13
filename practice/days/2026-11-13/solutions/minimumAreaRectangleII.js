var minAreaFreeRect = function(points) {
  const n = points.length;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const x1 = points[i][0];
    const y1 = points[i][1];
    for (let j = i + 1; j < n; j++) {
      const x2 = points[j][0];
      const y2 = points[j][1];
      const mx = x1 + x2;
      const my = y1 + y2;
      const dx = x1 - x2;
      const dy = y1 - y2;
      const d2 = dx * dx + dy * dy;
      const key = `${mx},${my},${d2}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push([i, j]);
    }
  }

  let minArea = Infinity;
  for (const list of map.values()) {
    if (list.length < 2) continue;
    const len = list.length;
    for (let p1 = 0; p1 < len; p1++) {
      const i = list[p1][0];
      const j = list[p1][1];
      for (let p2 = p1 + 1; p2 < len; p2++) {
        const k = list[p2][0];
        const dx1 = points[i][0] - points[k][0];
        const dy1 = points[i][1] - points[k][1];
        const d1 = dx1 * dx1 + dy1 * dy1;
        const dx2 = points[j][0] - points[k][0];
        const dy2 = points[j][1] - points[k][1];
        const d2 = dx2 * dx2 + dy2 * dy2;
        const area = Math.sqrt(d1 * d2);
        if (area < minArea) minArea = area;
      }
    }
  }

  return minArea === Infinity ? 0 : minArea;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(minAreaFreeRect(JSON.parse(line))));
    }
  }
}

module.exports = minAreaFreeRect;
