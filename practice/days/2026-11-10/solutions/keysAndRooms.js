var canVisitAllRooms = function(rooms) {
  const n = rooms.length;
  const vis = new Uint8Array(n);
  const q = new Int32Array(n);
  let head = 0, tail = 0;
  q[tail++] = 0;
  vis[0] = 1;
  let count = 1;

  while (head < tail) {
    const u = q[head++];
    const keys = rooms[u];
    for (let i = 0; i < keys.length; i++) {
      const v = keys[i];
      if (!vis[v]) {
        vis[v] = 1;
        count++;
        q[tail++] = v;
      }
    }
  }

  return count === n;
};

var solve = canVisitAllRooms;

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
  } catch (err) {}
}

module.exports = solve;
