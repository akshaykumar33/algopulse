var minimumCost = function(source, target, original, changed, cost) {
  const INF = 1e14;
  const dist = Array.from({ length: 26 }, () => new Float64Array(26).fill(INF));
  for (let i = 0; i < 26; i++) dist[i][i] = 0;

  for (let i = 0; i < original.length; i++) {
    const u = original[i].charCodeAt(0) - 97;
    const v = changed[i].charCodeAt(0) - 97;
    const c = cost[i];
    if (c < dist[u][v]) dist[u][v] = c;
  }

  for (let k = 0; k < 26; k++) {
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        const sum = dist[i][k] + dist[k][j];
        if (sum < dist[i][j]) dist[i][j] = sum;
      }
    }
  }

  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    const u = source.charCodeAt(i) - 97;
    const v = target.charCodeAt(i) - 97;
    if (dist[u][v] >= INF) return -1;
    totalCost += dist[u][v];
  }

  return totalCost;
};

var solve = minimumCost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3], parsed[4])));
    }
  } catch (e) {}
}

module.exports = minimumCost;