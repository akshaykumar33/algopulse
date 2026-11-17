var shortestBeautifulSubstring = function(s, k) {
  let best = '';
  for (let i = 0; i < s.length; i++) {
    let ones = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === '1') ones++;
      if (ones === k) {
        const sub = s.slice(i, j + 1);
        if (best === '' || sub.length < best.length || (sub.length === best.length && sub < best)) {
          best = sub;
        }
        break;
      }
    }
  }
  return best;
};

var solve = shortestBeautifulSubstring;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}
