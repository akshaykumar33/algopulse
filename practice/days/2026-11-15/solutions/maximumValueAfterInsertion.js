var maxValue = function(n, x) {
  const xs = String(x);
  if (n[0] !== '-') {
    for (let i = 0; i < n.length; i++) {
      if (Number(n[i]) < x) {
        return n.slice(0, i) + xs + n.slice(i);
      }
    }
    return n + xs;
  } else {
    for (let i = 1; i < n.length; i++) {
      if (Number(n[i]) > x) {
        return n.slice(0, i) + xs + n.slice(i);
      }
    }
    return n + xs;
  }
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(maxValue(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = maxValue;
