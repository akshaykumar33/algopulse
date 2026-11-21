const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) {
    console.log('NO');
    return;
  }
  const words = input.split(/\s+/);
  function getType(w) {
    if (w.length >= 4 && w.endsWith('lios')) return { gender: 0, type: 0 };
    if (w.length >= 5 && w.endsWith('liala')) return { gender: 1, type: 0 };
    if (w.length >= 3 && w.endsWith('etr')) return { gender: 0, type: 1 };
    if (w.length >= 4 && w.endsWith('etra')) return { gender: 1, type: 1 };
    if (w.length >= 6 && w.endsWith('initis')) return { gender: 0, type: 2 };
    if (w.length >= 6 && w.endsWith('inites')) return { gender: 1, type: 2 };
    return null;
  }
  if (words.length === 1) {
    const t = getType(words[0]);
    console.log(t ? 'YES' : 'NO');
    return;
  }
  const parsed = [];
  for (const w of words) {
    const t = getType(w);
    if (!t) {
      console.log('NO');
      return;
    }
    parsed.push(t);
  }
  const g = parsed[0].gender;
  let nouns = 0;
  let nounIdx = -1;
  for (let i = 0; i < parsed.length; i++) {
    if (parsed[i].gender !== g) {
      console.log('NO');
      return;
    }
    if (parsed[i].type === 1) {
      nouns++;
      nounIdx = i;
    }
  }
  if (nouns !== 1) {
    console.log('NO');
    return;
  }
  for (let i = 0; i < nounIdx; i++) {
    if (parsed[i].type !== 0) {
      console.log('NO');
      return;
    }
  }
  for (let i = nounIdx + 1; i < parsed.length; i++) {
    if (parsed[i].type !== 2) {
      console.log('NO');
      return;
    }
  }
  console.log('YES');
}
solve();
