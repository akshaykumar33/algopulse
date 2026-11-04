const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;

  const firstParts = input[lineIdx++].trim().split(/\s+/);
  const n = parseInt(firstParts[0], 10);
  const q = parseInt(firstParts[1], 10);

  const map = new Map();
  for (let i = 0; i < n; i++) {
    const parts = input[lineIdx++].trim().split(/\s+/);
    map.set(parts[0], parts[1]);
  }

  const out = [];
  for (let i = 0; i < q; i++) {
    const file = input[lineIdx++].trim();
    const lastDot = file.lastIndexOf('.');
    if (lastDot === -1) {
      out.push('unknown');
    } else {
      const ext = file.slice(lastDot + 1);
      if (map.has(ext)) {
        out.push(map.get(ext));
      } else {
        out.push('unknown');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

