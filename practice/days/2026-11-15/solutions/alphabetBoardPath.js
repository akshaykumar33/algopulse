var alphabetBoardPath = function(target) {
  let curR = 0, curC = 0;
  let ans = '';

  for (let i = 0; i < target.length; i++) {
    const code = target.charCodeAt(i) - 97;
    const destR = Math.floor(code / 5);
    const destC = code % 5;

    while (curC > destC) { ans += 'L'; curC--; }
    while (curR > destR) { ans += 'U'; curR--; }
    while (curC < destC) { ans += 'R'; curC++; }
    while (curR < destR) { ans += 'D'; curR++; }
    ans += '!';
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(alphabetBoardPath(JSON.parse(lines[i]))));
    }
  }
}

module.exports = alphabetBoardPath;
