var minAnagramLength = function(s) {
  const n = s.length;
  const pref = new Array(26);
  for (let c = 0; c < 26; c++) {
    pref[c] = new Int32Array(n + 1);
  }
  for (let i = 0; i < n; i++) {
    const code = s.charCodeAt(i) - 97;
    for (let c = 0; c < 26; c++) {
      pref[c][i + 1] = pref[c][i] + (c === code ? 1 : 0);
    }
  }

  const divs = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d === 0) {
      divs.push(d);
      if (d * d !== n) divs.push(n / d);
    }
  }
  divs.sort((a, b) => a - b);

  for (let i = 0; i < divs.length; i++) {
    const k = divs[i];
    let ok = true;
    for (let block = 1; block < n / k; block++) {
      const l = block * k;
      const r = l + k;
      for (let c = 0; c < 26; c++) {
        if (pref[c][r] - pref[c][l] !== pref[c][k]) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }
    if (ok) return k;
  }

  return n;
};

var solve = minAnagramLength;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = minAnagramLength;
