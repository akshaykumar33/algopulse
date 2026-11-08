var expressiveWords = function(s, words) {
  function getGroups(str) {
    const g = [];
    let i = 0;
    while (i < str.length) {
      let j = i;
      while (j < str.length && str[j] === str[i]) j++;
      g.push([str[i], j - i]);
      i = j;
    }
    return g;
  }
  const gs = getGroups(s);
  let ans = 0;
  for (let w = 0; w < words.length; w++) {
    const gw = getGroups(words[w]);
    if (gw.length !== gs.length) continue;
    let ok = true;
    for (let i = 0; i < gs.length; i++) {
      if (gs[i][0] !== gw[i][0]) {
        ok = false;
        break;
      }
      const lenS = gs[i][1];
      const lenW = gw[i][1];
      if (lenW > lenS || (lenS < 3 && lenS !== lenW)) {
        ok = false;
        break;
      }
    }
    if (ok) ans++;
  }
  return ans;
};

var solve = expressiveWords;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
