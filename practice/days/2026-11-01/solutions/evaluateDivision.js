var calcEquation = function(equations, values, queries) {
    const adj = new Map();
    for (let i = 0; i < equations.length; i++) {
        const [u, v] = equations[i];
        const val = values[i];
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u).push({ to: v, val: val });
        adj.get(v).push({ to: u, val: 1.0 / val });
    }

    const results = [];
    for (const [start, end] of queries) {
        if (!adj.has(start) || !adj.has(end)) {
            results.push(-1.0);
            continue;
        }
        if (start === end) {
            results.push(1.0);
            continue;
        }

        const visited = new Set([start]);
        const queue = [{ node: start, prod: 1.0 }];
        let found = -1.0;

        while (queue.length > 0) {
            const { node, prod } = queue.shift();
            if (node === end) {
                found = prod;
                break;
            }

            for (const edge of adj.get(node) || []) {
                if (!visited.has(edge.to)) {
                    visited.add(edge.to);
                    queue.push({ node: edge.to, prod: prod * edge.val });
                }
            }
        }

        results.push(found);
    }

    return results;
};

var solve = function(equations, values, queries) {
    if (Array.isArray(equations) && equations.length === 3 && values === undefined) {
        return calcEquation(equations[0], equations[1], equations[2]);
    }
    return calcEquation(equations, values, queries);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && parsed.length === 3 ? solve(parsed[0], parsed[1], parsed[2]) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = calcEquation;

