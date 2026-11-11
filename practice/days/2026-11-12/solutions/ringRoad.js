const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const adj = Array.from({ length: n + 1 }, () => []);
  let total = 0;

  for (let i = 0; i < n; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    adj[u].push({ to: v, cost: 0 });
    adj[v].push({ to: u, cost: c });
    total += c;
  }

  let prev = 1;
  let cur = adj[1][0].to;
  let cost1 = adj[1][0].cost;

  for (let step = 1; step < n; step++) {
    const e0 = adj[cur][0];
    const e1 = adj[cur][1];
    const nxt = e0.to === prev ? e1 : e0;
    cost1 += nxt.cost;
    prev = cur;
    cur = nxt.to;
  }

  const cost2 = total - cost1;
  console.log(cost1 < cost2 ? cost1 : cost2);
}

solve();
