var isItPossible = function(word1, word2) {
  const c1 = new Int32Array(26);
  const c2 = new Int32Array(26);
  for (let i = 0; i < word1.length; i++) c1[word1.charCodeAt(i) - 97]++;
  for (let i = 0; i < word2.length; i++) c2[word2.charCodeAt(i) - 97]++;

  let d1 = 0;
  let d2 = 0;
  for (let i = 0; i < 26; i++) {
    if (c1[i] > 0) d1++;
    if (c2[i] > 0) d2++;
  }

  for (let i = 0; i < 26; i++) {
    if (c1[i] === 0) continue;
    for (let j = 0; j < 26; j++) {
      if (c2[j] === 0) continue;

      if (i === j) {
        if (d1 === d2) return true;
        continue;
      }

      let nd1 = d1;
      let nd2 = d2;

      if (c1[i] === 1) nd1--;
      if (c1[j] === 0) nd1++;

      if (c2[j] === 1) nd2--;
      if (c2[i] === 0) nd2++;

      if (nd1 === nd2) return true;
    }
  }

  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      try {
        const p = JSON.parse(l);
        return Array.isArray(p) && p.length === 2 && typeof p[0] === 'string';
      } catch (_) {
        return false;
      }
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(isItPossible(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(isItPossible(...args)));
      }
    }
  }
}

module.exports = isItPossible;
