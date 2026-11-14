var matrixSumQueries = function(n, queries) {
  const seenR = new Uint8Array(n);
  const seenC = new Uint8Array(n);
  let countR = 0, countC = 0;
  let ans = 0n;

  for (let i = queries.length - 1; i >= 0; i--) {
    const [type, idx, val] = queries[i];
    if (type === 0) {
      if (!seenR[idx]) {
        seenR[idx] = 1;
        countR++;
        ans += BigInt(val) * BigInt(n - countC);
      }
    } else {
      if (!seenC[idx]) {
        seenC[idx] = 1;
        countC++;
        ans += BigInt(val) * BigInt(n - countR);
      }
    }
    if (countR === n && countC === n) break;
  }
  return Number(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(matrixSumQueries(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = matrixSumQueries;
