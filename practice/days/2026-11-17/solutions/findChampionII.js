var findChampion = function(n, edges) {
  const inDeg = new Int32Array(n);
  for (let i = 0; i < edges.length; i++) {
    inDeg[edges[i][1]]++;
  }
  let champ = -1;
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      if (champ !== -1) return -1;
      champ = i;
    }
  }
  return champ;
};

var solve = findChampion;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}
