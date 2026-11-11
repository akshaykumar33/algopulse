var intervalIntersection = function(firstList, secondList) {
  const res = [];
  let i = 0;
  let j = 0;
  const n = firstList.length;
  const m = secondList.length;

  while (i < n && j < m) {
    const a = firstList[i];
    const b = secondList[j];
    const lo = a[0] > b[0] ? a[0] : b[0];
    const hi = a[1] < b[1] ? a[1] : b[1];
    if (lo <= hi) res.push([lo, hi]);
    if (a[1] < b[1]) i++;
    else j++;
  }

  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && Array.isArray(p[1]) &&
        (p[0].length === 0 || Array.isArray(p[0][0])) &&
        (p[1].length === 0 || Array.isArray(p[1][0]));
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(intervalIntersection(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(intervalIntersection(...args)));
      }
    }
  }
}

module.exports = intervalIntersection;
