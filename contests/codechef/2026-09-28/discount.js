const fs = require('fs');

function solve() {
  const content = fs.readFileSync(0, 'utf-8').trim();
  if (!content) return;
  const tokens = content.split(/\s+/);
  if (tokens.length === 0 || !tokens[0]) return;

  const T = parseInt(tokens[0], 10);
  const output = [];

  for (let t = 1; t <= T && t < tokens.length; t++) {
    const s = tokens[t];
    let removeIdx = s.length - 1;
    for (let i = 0; i < s.length - 1; i++) {
      if (s.charCodeAt(i) > s.charCodeAt(i + 1)) {
        removeIdx = i;
        break;
      }
    }
    const res = s.slice(0, removeIdx) + s.slice(removeIdx + 1);
    output.push(String(Number(res)));
  }

  console.log(output.join('\n'));
}

solve();
