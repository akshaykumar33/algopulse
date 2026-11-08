var validateBinaryTreeNodes = function(n, leftChild, rightChild) {
  const inDeg = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const l = leftChild[i];
    if (l !== -1) {
      if (++inDeg[l] > 1) return false;
    }
    const r = rightChild[i];
    if (r !== -1) {
      if (++inDeg[r] > 1) return false;
    }
  }
  let root = -1;
  for (let i = 0; i < n; i++) {
    if (inDeg[i] === 0) {
      if (root !== -1) return false;
      root = i;
    }
  }
  if (root === -1) return false;
  const q = [root];
  const vis = new Uint8Array(n);
  vis[root] = 1;
  let count = 0;
  while (q.length > 0) {
    const u = q.shift();
    count++;
    const l = leftChild[u];
    if (l !== -1) {
      if (vis[l]) return false;
      vis[l] = 1;
      q.push(l);
    }
    const r = rightChild[u];
    if (r !== -1) {
      if (vis[r]) return false;
      vis[r] = 1;
      q.push(r);
    }
  }
  return count === n;
};

var solve = validateBinaryTreeNodes;
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
