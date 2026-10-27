const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return;
  const s = lines[0].trim();
  const k = parseInt(lines[1].trim(), 10);

  let letters = 0;
  let candy = 0;
  let snow = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '?') candy++;
    else if (s[i] === '*') snow++;
    else letters++;
  }

  const minLen = letters - candy - snow;
  const maxLen = snow > 0 ? Infinity : letters;

  if (k < minLen || k > maxLen) {
    console.log('Impossible');
    return;
  }

  let res = [];
  if (k <= letters) {
    let toRemove = letters - k;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '?' || s[i] === '*') continue;
      const next = s[i + 1];
      if ((next === '?' || next === '*') && toRemove > 0) {
        toRemove--;
      } else {
        res.push(s[i]);
      }
    }
  } else {
    let toAdd = k - letters;
    let added = false;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '?' || s[i] === '*') continue;
      const next = s[i + 1];
      res.push(s[i]);
      if (next === '*' && !added) {
        for (let j = 0; j < toAdd; j++) {
          res.push(s[i]);
        }
        added = true;
      }
    }
  }

  console.log(res.join(''));
}

solve();
