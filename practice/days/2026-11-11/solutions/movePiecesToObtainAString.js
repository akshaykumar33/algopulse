var canChange = function(start, target) {
  const n = start.length;
  let i = 0;
  let j = 0;
  while (i < n || j < n) {
    while (i < n && start[i] === '_') i++;
    while (j < n && target[j] === '_') j++;
    if (i === n || j === n) return i === n && j === n;
    if (start[i] !== target[j]) return false;
    if (start[i] === 'L' && i < j) return false;
    if (start[i] === 'R' && i > j) return false;
    i++;
    j++;
  }
  return true;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === canChange.length && !(Array.isArray(parsed[0]) && parsed[0].length === canChange.length && parsed.every((p) => Array.isArray(p) && p.length === canChange.length))) {
      console.log(JSON.stringify(canChange(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(canChange(...p)));
      }
    }
  }
}

module.exports = canChange;
