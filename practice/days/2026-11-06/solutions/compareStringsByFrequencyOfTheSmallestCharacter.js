var numSmallerByFrequency = function(queries, words) {
  function f(s) {
    let minChar = s[0];
    let count = 1;
    for (let i = 1; i < s.length; i++) {
      if (s[i] < minChar) {
        minChar = s[i];
        count = 1;
      } else if (s[i] === minChar) {
        count++;
      }
    }
    return count;
  }

  const counts = new Int32Array(12);
  for (let i = 0; i < words.length; i++) {
    counts[f(words[i])]++;
  }

  const suff = new Int32Array(13);
  for (let i = 11; i >= 1; i--) {
    suff[i] = suff[i + 1] + counts[i];
  }

  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const qCount = f(queries[i]);
    ans[i] = suff[qCount + 1];
  }

  return ans;
};

var solve = typeof numSmallerByFrequency !== 'undefined' ? numSmallerByFrequency : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const queries = JSON.parse(lines[i]);
        const words = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(queries, words)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

