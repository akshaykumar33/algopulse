var memLeak = function(memory1, memory2) {
  let t = 1;
  while (memory1 >= t || memory2 >= t) {
    if (memory1 >= memory2) {
      memory1 -= t;
    } else {
      memory2 -= t;
    }
    t++;
  }
  return [t, memory1, memory2];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === memLeak.length && !(Array.isArray(parsed[0]) && parsed[0].length === memLeak.length && parsed.every((p) => Array.isArray(p) && p.length === memLeak.length))) {
      console.log(JSON.stringify(memLeak(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(memLeak(...p)));
      }
    }
  }
}

module.exports = memLeak;
