var canFinish = function(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  for (const [u, v] of prerequisites) {
    adj[v].push(u);
    inDegree[u]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) q.push(i);
  }
  let cnt = 0;
  while (q.length > 0) {
    const u = q.shift();
    cnt++;
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        q.push(v);
      }
    }
  }
  return cnt === numCourses;
};
var solve = typeof canFinish !== 'undefined' ? canFinish : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const numCourses = JSON.parse(lines[i]);
        const prerequisites = JSON.parse(lines[i+1]);
        const result = solve(numCourses, prerequisites);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
