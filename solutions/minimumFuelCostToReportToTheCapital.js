var minimumFuelCost = function(roads, seats) {
  const n = roads.length + 1;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of roads) {
    adj[u].push(v);
    adj[v].push(u);
  }

  let fuel = 0;

  function dfs(u, p) {
    let people = 1;
    for (const v of adj[u]) {
      if (v !== p) {
        people += dfs(v, u);
      }
    }
    if (u !== 0) {
      fuel += Math.ceil(people / seats);
    }
    return people;
  }

  dfs(0, -1);
  return fuel;
};

var solve = minimumFuelCost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
