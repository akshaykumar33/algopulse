var findTheCity = function(n, edges, distanceThreshold) {
  const dist = Array.from({ length: n }, () => new Int32Array(n).fill(1e9));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w;
  }
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  let minCount = 1e9;
  let ans = -1;
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] <= distanceThreshold) {
        cnt++;
      }
    }
    if (cnt <= minCount) {
      minCount = cnt;
      ans = i;
    }
  }
  return ans;
};

var solve = findTheCity;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = findTheCity;
