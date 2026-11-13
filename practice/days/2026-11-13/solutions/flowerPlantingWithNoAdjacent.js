var gardenNoAdj = function(n, paths) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < paths.length; i++) {
    const u = paths[i][0];
    const v = paths[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }
  const ans = new Int32Array(n);
  for (let i = 1; i <= n; i++) {
    const used = [false, false, false, false, false];
    const neighbors = adj[i];
    for (let j = 0; j < neighbors.length; j++) {
      const neighbor = neighbors[j];
      if (ans[neighbor - 1] !== 0) {
        used[ans[neighbor - 1]] = true;
      }
    }
    for (let c = 1; c <= 4; c++) {
      if (!used[c]) {
        ans[i - 1] = c;
        break;
      }
    }
  }
  return Array.from(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(gardenNoAdj(...parsed)));
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const paths = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(gardenNoAdj(n, paths)));
      }
    }
  }
}

module.exports = gardenNoAdj;
