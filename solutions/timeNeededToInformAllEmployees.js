var numOfMinutes = function(n, headID, manager, informTime) {
    const adj = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; i++) {
        if (manager[i] !== -1) {
            adj[manager[i]].push(i);
        }
    }
    let ans = 0;
    const q = [[headID, 0]];
    let head = 0;
    while (head < q.length) {
        const [u, t] = q[head++];
        ans = Math.max(ans, t);
        for (const v of adj[u]) {
            q.push([v, t + informTime[u]]);
        }
    }
    return ans;
};
var solve = numOfMinutes;

if (require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length >= 4) {
    const n = JSON.parse(input[0]);
    const headID = JSON.parse(input[1]);
    const manager = JSON.parse(input[2]);
    const informTime = JSON.parse(input[3]);
    console.log(solve(n, headID, manager, informTime));
  }
}
