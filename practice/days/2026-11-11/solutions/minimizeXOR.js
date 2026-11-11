var minimizeXor = function(num1, num2) {
  let cnt = 0;
  let t = num2;
  while (t > 0) {
    t &= t - 1;
    cnt++;
  }
  let x = 0;
  for (let b = 30; b >= 0 && cnt > 0; b--) {
    if ((num1 >>> b) & 1) {
      x |= 1 << b;
      cnt--;
    }
  }
  for (let b = 0; b <= 30 && cnt > 0; b++) {
    if (!((x >>> b) & 1)) {
      x |= 1 << b;
      cnt--;
    }
  }
  return x >>> 0;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === minimizeXor.length && !(Array.isArray(parsed[0]) && parsed[0].length === minimizeXor.length && parsed.every((p) => Array.isArray(p) && p.length === minimizeXor.length))) {
      console.log(JSON.stringify(minimizeXor(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(minimizeXor(...p)));
      }
    }
  }
}

module.exports = minimizeXor;
