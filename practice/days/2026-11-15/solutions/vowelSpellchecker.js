var spellchecker = function(wordlist, queries) {
  const exact = new Set(wordlist);
  const lowerMap = new Map();
  const devowelMap = new Map();

  function devowel(w) {
    return w.toLowerCase().replace(/[aeiou]/g, '*');
  }

  for (const w of wordlist) {
    const low = w.toLowerCase();
    if (!lowerMap.has(low)) lowerMap.set(low, w);
    const dev = devowel(w);
    if (!devowelMap.has(dev)) devowelMap.set(dev, w);
  }

  const ans = [];
  for (const q of queries) {
    if (exact.has(q)) {
      ans.push(q);
      continue;
    }
    const low = q.toLowerCase();
    if (lowerMap.has(low)) {
      ans.push(lowerMap.get(low));
      continue;
    }
    const dev = devowel(q);
    if (devowelMap.has(dev)) {
      ans.push(devowelMap.get(dev));
      continue;
    }
    ans.push('');
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(spellchecker(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = spellchecker;
