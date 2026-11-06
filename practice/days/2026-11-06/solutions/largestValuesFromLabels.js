var largestValsFromLabels = function(values, labels, numWanted, useLimit) {
  const n = values.length;
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push({ val: values[i], lab: labels[i] });
  }

  items.sort((a, b) => b.val - a.val);

  const usage = new Map();
  let total = 0;
  let taken = 0;

  for (let i = 0; i < n && taken < numWanted; i++) {
    const lab = items[i].lab;
    const cnt = usage.get(lab) || 0;
    if (cnt < useLimit) {
      total += items[i].val;
      usage.set(lab, cnt + 1);
      taken++;
    }
  }

  return total;
};

var solve = typeof largestValsFromLabels !== 'undefined' ? largestValsFromLabels : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 4) {
        const values = JSON.parse(lines[i]);
        const labels = JSON.parse(lines[i + 1]);
        const numWanted = JSON.parse(lines[i + 2]);
        const useLimit = JSON.parse(lines[i + 3]);
        console.log(JSON.stringify(solve(values, labels, numWanted, useLimit)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

