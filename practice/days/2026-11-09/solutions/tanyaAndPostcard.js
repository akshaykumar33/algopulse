const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const s = tokens[0];
  const t = tokens[1];

  const cnt = new Int32Array(128);
  for (let i = 0; i < t.length; i++) {
    cnt[t.charCodeAt(i)]++;
  }

  let yay = 0;
  const matched = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (cnt[code] > 0) {
      yay++;
      cnt[code]--;
      matched[i] = 1;
    }
  }

  let whoops = 0;
  for (let i = 0; i < s.length; i++) {
    if (matched[i] === 0) {
      const code = s.charCodeAt(i);
      const opp = code >= 65 && code <= 90 ? code + 32 : code - 32;
      if (cnt[opp] > 0) {
        whoops++;
        cnt[opp]--;
      }
    }
  }

  console.log(yay + ' ' + whoops);
}

solve();
