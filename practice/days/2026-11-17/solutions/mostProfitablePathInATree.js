var mostProfitablePath = function(edges, bob, amount) {
  const n = amount.length;
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  const bobPath = [];
  function findBob(u, p) {
    bobPath.push(u);
    if (u === 0) return true;
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v !== p && findBob(v, u)) return true;
    }
    bobPath.pop();
    return false;
  }
  findBob(bob, -1);

  const bobTime = new Int32Array(n).fill(-1);
  for (let i = 0; i < bobPath.length; i++) {
    bobTime[bobPath[i]] = i;
  }

  let maxIncome = -Infinity;
  function dfsAlice(u, p, t, income) {
    let cur = amount[u];
    if (bobTime[u] !== -1) {
      if (t > bobTime[u]) {
        cur = 0;
      } else if (t === bobTime[u]) {
        cur = Math.floor(cur / 2);
      }
    }
    income += cur;

    let isLeaf = true;
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v !== p) {
        isLeaf = false;
        dfsAlice(v, u, t + 1, income);
      }
    }
    if (isLeaf) {
      if (income > maxIncome) {
        maxIncome = income;
      }
    }
  }

  dfsAlice(0, -1, 0, 0);
  return maxIncome;
};

var solve = mostProfitablePath;

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
