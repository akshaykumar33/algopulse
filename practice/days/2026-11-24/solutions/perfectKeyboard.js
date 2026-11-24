const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let kb = [s[0]];
    let curr = 0;
    const vis = new Uint8Array(26);
    vis[s.charCodeAt(0) - 97] = 1;
    let ok = true;
    for (let i = 1; i < s.length; i++) {
      const c = s[i];
      const code = c.charCodeAt(0) - 97;
      if (vis[code]) {
        if (curr + 1 < kb.length && kb[curr + 1] === c) {
          curr++;
        } else if (curr - 1 >= 0 && kb[curr - 1] === c) {
          curr--;
        } else {
          ok = false;
          break;
        }
      } else {
        if (curr + 1 === kb.length) {
          kb.push(c);
          curr++;
          vis[code] = 1;
        } else if (curr === 0) {
          kb.unshift(c);
          vis[code] = 1;
        } else {
          ok = false;
          break;
        }
      }
    }
    if (!ok) {
      out.push('NO');
    } else {
      for (let i = 0; i < 26; i++) {
        if (!vis[i]) kb.push(String.fromCharCode(97 + i));
      }
      out.push('YES\n' + kb.join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();
