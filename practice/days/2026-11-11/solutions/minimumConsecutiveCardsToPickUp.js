var minimumCardPickup = function(cards) {
  const last = new Map();
  let ans = Infinity;
  for (let i = 0; i < cards.length; i++) {
    const v = cards[i];
    const prev = last.get(v);
    if (prev !== undefined) {
      const len = i - prev + 1;
      if (len < ans) ans = len;
    }
    last.set(v, i);
  }
  return ans === Infinity ? -1 : ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(minimumCardPickup(JSON.parse(line))));
    }
  }
}
