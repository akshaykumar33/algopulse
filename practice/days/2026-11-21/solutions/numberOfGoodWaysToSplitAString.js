var numSplits = function(s) {
  const n = s.length;
  const pref = new Int32Array(n);
  const suff = new Int32Array(n);
  const seenL = new Uint8Array(26);
  let distinctL = 0;
  for (let i = 0; i < n; i++) {
    const c = s.charCodeAt(i) - 97;
    if (!seenL[c]) { seenL[c] = 1; distinctL++; }
    pref[i] = distinctL;
  }
  const seenR = new Uint8Array(26);
  let distinctR = 0;
  for (let i = n - 1; i >= 0; i--) {
    const c = s.charCodeAt(i) - 97;
    if (!seenR[c]) { seenR[c] = 1; distinctR++; }
    suff[i] = distinctR;
  }
  let ans = 0;
  for (let i = 0; i < n - 1; i++) {
    if (pref[i] === suff[i + 1]) ans++;
  }
  return ans;
};

var solve = numSplits;

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

module.exports = numSplits;