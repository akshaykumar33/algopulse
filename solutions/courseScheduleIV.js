var checkIfPrerequisite = function(numCourses, prerequisites, queries) {
  const reach = Array.from({ length: numCourses }, () => new Uint8Array(numCourses));

  for (const [u, v] of prerequisites) {
    reach[u][v] = 1;
  }

  for (let k = 0; k < numCourses; k++) {
    for (let i = 0; i < numCourses; i++) {
      if (reach[i][k]) {
        for (let j = 0; j < numCourses; j++) {
          if (reach[k][j]) reach[i][j] = 1;
        }
      }
    }
  }

  return queries.map(([u, v]) => Boolean(reach[u][v]));
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 3) {
      console.log(JSON.stringify(checkIfPrerequisite(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]))));
    }
  }
}

module.exports = checkIfPrerequisite;
