var unhappyFriends = function(n, preferences, pairs) {
  const partner = new Int32Array(n);
  for (let i = 0; i < pairs.length; i++) {
    const x = pairs[i][0];
    const y = pairs[i][1];
    partner[x] = y;
    partner[y] = x;
  }
  const rank = Array.from({ length: n }, () => new Int32Array(n));
  for (let i = 0; i < n; i++) {
    const pref = preferences[i];
    for (let r = 0; r < pref.length; r++) {
      rank[i][pref[r]] = r;
    }
  }
  let ans = 0;
  for (let x = 0; x < n; x++) {
    const y = partner[x];
    const yRank = rank[x][y];
    let unhappy = false;
    for (let r = 0; r < yRank; r++) {
      const u = preferences[x][r];
      const v = partner[u];
      if (rank[u][x] < rank[u][v]) {
        unhappy = true;
        break;
      }
    }
    if (unhappy) ans++;
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(unhappyFriends(...parsed)));
    } else {
      for (let i = 0; i + 2 < lines.length; i += 3) {
        const n = JSON.parse(lines[i]);
        const prefs = JSON.parse(lines[i + 1]);
        const pairs = JSON.parse(lines[i + 2]);
        console.log(JSON.stringify(unhappyFriends(n, prefs, pairs)));
      }
    }
  }
}

module.exports = unhappyFriends;
