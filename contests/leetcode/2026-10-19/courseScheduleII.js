var solve = function(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [u, v] of prerequisites) {
    adj[v].push(u);
    inDegree[u]++;
  }
  
  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      q.push(i);
    }
  }
  
  const res = [];
  while (q.length > 0) {
    const cur = q.shift();
    res.push(cur);
    
    for (const nxt of adj[cur]) {
      inDegree[nxt]--;
      if (inDegree[nxt] === 0) {
        q.push(nxt);
      }
    }
  }
  
  return res.length === numCourses ? res : [];
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let parsedArgs = [];
      for (let i = 0; i < lines.length; i++) {
        parsedArgs.push(JSON.parse(lines[i]));
        if (parsedArgs.length === 2) {
          const result = solve(parsedArgs[0], parsedArgs[1]);
          console.log(JSON.stringify(result));
          parsedArgs = [];
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
