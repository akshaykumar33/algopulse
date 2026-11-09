const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokT = nextToken();
  if (!tokT) return;
  const t = parseInt(tokT, 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(nextToken(), 10);
    const m = parseInt(nextToken(), 10);
    const d = parseInt(nextToken(), 10);

    const s = [];
    for (let i = 0; i < n; i++) {
      s.push(nextToken());
    }

    const vis = Array.from({ length: n }, () => new Uint8Array(m));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (s[i][j] === '*') {
          let len = 0;
          while (
            i - len - 1 >= 0 &&
            j - len - 1 >= 0 &&
            j + len + 1 < m &&
            s[i - len - 1][j - len - 1] === '*' &&
            s[i - len - 1][j + len + 1] === '*'
          ) {
            len++;
          }

          if (len >= d) {
            vis[i][j] = 1;
            for (let h = 1; h <= len; h++) {
              vis[i - h][j - h] = 1;
              vis[i - h][j + h] = 1;
            }
          }
        }
      }
    }

    let ok = true;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (s[i][j] === '*' && vis[i][j] === 0) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
