var openTheLock = function(deadends, target) {
    const dead = new Set(deadends);
    if (dead.has("0000")) return -1;
    if (target === "0000") return 0;

    const q = ["0000"];
    const vis = new Set(["0000"]);
    let steps = 0;

    while (q.length > 0) {
        const sz = q.length;
        for (let i = 0; i < sz; i++) {
            const cur = q.shift();
            if (cur === target) return steps;

            for (let j = 0; j < 4; j++) {
                const digit = parseInt(cur[j]);
                for (const d of [-1, 1]) {
                    const nextDigit = (digit + d + 10) % 10;
                    const nextStr = cur.substring(0, j) + nextDigit + cur.substring(j + 1);

                    if (!dead.has(nextStr) && !vis.has(nextStr)) {
                        vis.add(nextStr);
                        q.push(nextStr);
                    }
                }
            }
        }
        steps++;
    }

    return -1;
};
var solve = typeof openTheLock !== 'undefined' ? openTheLock : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const deadends = JSON.parse(lines[i]);
        const target = JSON.parse(lines[i + 1]);
        const result = solve(deadends, target);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
