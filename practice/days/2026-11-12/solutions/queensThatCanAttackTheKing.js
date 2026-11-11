var queensAttacktheKing = function(queens, king) {
  const board = new Uint8Array(64);
  for (let i = 0; i < queens.length; i++) {
    board[(queens[i][0] << 3) | queens[i][1]] = 1;
  }
  const ans = [];
  const kr = king[0];
  const kc = king[1];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      let r = kr + dr;
      let c = kc + dc;
      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        if (board[(r << 3) | c]) {
          ans.push([r, c]);
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every(
      (p) => Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && Array.isArray(p[1]) && p[1].length === 2 && typeof p[1][0] === 'number'
    );
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(queensAttacktheKing(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(queensAttacktheKing(...p)));
      }
    }
  }
}

module.exports = queensAttacktheKing;
