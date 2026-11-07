var minimumOperations = function(nums, start, goal) {
  const vis = new Uint8Array(1001);
  const q = [start];
  if (start >= 0 && start <= 1000) vis[start] = 1;
  let steps = 0;
  let head = 0;

  while (head < q.length) {
    const size = q.length - head;
    for (let s = 0; s < size; s++) {
      const cur = q[head++];
      if (cur === goal) return steps;
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const nexts = [cur + num, cur - num, cur ^ num];
        for (let j = 0; j < 3; j++) {
          const next = nexts[j];
          if (next === goal) return steps + 1;
          if (next >= 0 && next <= 1000 && !vis[next]) {
            vis[next] = 1;
            q.push(next);
          }
        }
      }
    }
    steps++;
  }
  return -1;
};

var solve = typeof minimumOperations !== 'undefined' ? minimumOperations : null;

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
module.exports = { minimumOperations, solve };
