var findLexSmallestString = function(s, a, b) {
  const n = s.length;
  let ans = s;
  const vis = new Set([s]);
  const q = [s];
  let head = 0;
  while (head < q.length) {
    const cur = q[head++];
    if (cur < ans) ans = cur;

    const chars = cur.split('');
    for (let i = 1; i < n; i += 2) {
      chars[i] = String((Number(chars[i]) + a) % 10);
    }
    const op1 = chars.join('');
    if (!vis.has(op1)) {
      vis.add(op1);
      q.push(op1);
    }

    const op2 = cur.slice(n - b) + cur.slice(0, n - b);
    if (!vis.has(op2)) {
      vis.add(op2);
      q.push(op2);
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      try {
        const p = JSON.parse(l);
        return Array.isArray(p) && p.length === 3 && typeof p[0] === 'string';
      } catch (_) {
        return false;
      }
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(findLexSmallestString(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 2 < lines.length; i += 3) {
        const args = lines.slice(i, i + 3).map((l) => JSON.parse(l));
        console.log(JSON.stringify(findLexSmallestString(...args)));
      }
    }
  }
}

module.exports = findLexSmallestString;
