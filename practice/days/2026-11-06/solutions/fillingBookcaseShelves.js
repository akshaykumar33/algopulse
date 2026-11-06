var minHeightShelves = function(books, shelfWidth) {
  const n = books.length;
  const dp = new Int32Array(n + 1).fill(1e9);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    let w = 0;
    let h = 0;
    for (let j = i - 1; j >= 0; j--) {
      w += books[j][0];
      if (w > shelfWidth) break;
      if (books[j][1] > h) h = books[j][1];
      if (dp[j] + h < dp[i]) {
        dp[i] = dp[j] + h;
      }
    }
  }

  return dp[n];
};

var solve = typeof minHeightShelves !== 'undefined' ? minHeightShelves : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const books = JSON.parse(lines[i]);
        const shelfWidth = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(books, shelfWidth)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

