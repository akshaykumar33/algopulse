var alphabetBoardPath = function(target) {
  let r = 0;
  let c = 0;
  const res = [];

  for (let i = 0; i < target.length; i++) {
    const code = target.charCodeAt(i) - 97;
    const tr = Math.floor(code / 5);
    const tc = code % 5;

    while (c > tc) {
      res.push('L');
      c--;
    }
    while (r > tr) {
      res.push('U');
      r--;
    }
    while (r < tr) {
      res.push('D');
      r++;
    }
    while (c < tc) {
      res.push('R');
      c++;
    }
    res.push('!');
  }
  return res.join('');
};

var solve = alphabetBoardPath;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
