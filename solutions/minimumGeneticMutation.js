var minMutation = function(startGene, endGene, bank) {
  const bankSet = new Set(bank);
  if (!bankSet.has(endGene)) return -1;
  const genes = ['A', 'C', 'G', 'T'];
  const queue = [[startGene, 0]];
  const visited = new Set([startGene]);

  while (queue.length > 0) {
    const [curr, steps] = queue.shift();
    if (curr === endGene) return steps;

    for (let i = 0; i < curr.length; i++) {
      for (const ch of genes) {
        if (ch !== curr[i]) {
          const next = curr.slice(0, i) + ch + curr.slice(i + 1);
          if (bankSet.has(next) && !visited.has(next)) {
            visited.add(next);
            queue.push([next, steps + 1]);
          }
        }
      }
    }
  }
  return -1;
};

var solve = minMutation;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
