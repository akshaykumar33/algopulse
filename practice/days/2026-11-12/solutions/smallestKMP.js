const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const cnt = new Int32Array(26);

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const p = tokens[ptr++];
    cnt.fill(0);

    for (let i = 0; i < s.length; i++) {
      cnt[s.charCodeAt(i) - 97]++;
    }
    for (let i = 0; i < p.length; i++) {
      cnt[p.charCodeAt(i) - 97]--;
    }

    const p0 = p.charCodeAt(0) - 97;
    let putBefore = true;
    for (let i = 1; i < p.length; i++) {
      const ch = p.charCodeAt(i) - 97;
      if (ch !== p0) {
        putBefore = ch > p0;
        break;
      }
    }

    const parts = [];
    for (let c = 0; c < p0; c++) {
      if (cnt[c] > 0) parts.push(String.fromCharCode(97 + c).repeat(cnt[c]));
    }
    if (putBefore && cnt[p0] > 0) {
      parts.push(p[0].repeat(cnt[p0]));
    }
    parts.push(p);
    if (!putBefore && cnt[p0] > 0) {
      parts.push(p[0].repeat(cnt[p0]));
    }
    for (let c = p0 + 1; c < 26; c++) {
      if (cnt[c] > 0) parts.push(String.fromCharCode(97 + c).repeat(cnt[c]));
    }
    out.push(parts.join(''));
  }

  console.log(out.join('\n'));
}

solve();
