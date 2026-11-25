var countOfSubstrings = function(word, k) {
  const n = word.length;
  const vowelIdx = (code) => {
    if (code === 97) return 0;
    if (code === 101) return 1;
    if (code === 105) return 2;
    if (code === 111) return 3;
    if (code === 117) return 4;
    return -1;
  };
  const atLeast = (m) => {
    const cnt = new Int32Array(5);
    let kinds = 0;
    let cons = 0;
    let left = 0;
    let res = 0;
    for (let right = 0; right < n; right++) {
      const vi = vowelIdx(word.charCodeAt(right));
      if (vi !== -1) {
        if (cnt[vi] === 0) kinds++;
        cnt[vi]++;
      } else {
        cons++;
      }
      while (kinds === 5 && cons >= m) {
        res += n - right;
        const lvi = vowelIdx(word.charCodeAt(left));
        if (lvi !== -1) {
          cnt[lvi]--;
          if (cnt[lvi] === 0) kinds--;
        } else {
          cons--;
        }
        left++;
      }
    }
    return res;
  };
  return atLeast(k) - atLeast(k + 1);
};

var solve = countOfSubstrings;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const word = JSON.parse(lines[i]);
      const k = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(countOfSubstrings(word, k)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = countOfSubstrings;
