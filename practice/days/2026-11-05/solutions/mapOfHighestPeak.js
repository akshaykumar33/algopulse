var mapOfHighestPeak = function(isWater) {
    const m = isWater.length;
    const n = isWater[0].length;
    const height = Array.from({ length: m }, () => new Array(n).fill(-1));
    const q = [];
    
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (isWater[r][c] === 1) {
                height[r][c] = 0;
                q.push([r, c]);
            }
        }
    }
    
    let head = 0;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    
    while (head < q.length) {
        const [r, c] = q[head++];
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && height[nr][nc] === -1) {
                height[nr][nc] = height[r][c] + 1;
                q.push([nr, nc]);
            }
        }
    }
    
    return height;
};

var solve = typeof mapOfHighestPeak !== 'undefined' ? mapOfHighestPeak : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
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
