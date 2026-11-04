const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const [n, m] = input[0].trim().split(/\s+/).map(Number);
  const a = input[1].trim().split(/\s+/).map(Number);

  let offset = 0;
  const out = [];

  for (let i = 0; i < m; i++) {
    const line = input[2 + i];
    if (!line || !line.trim()) continue;
    const parts = line.trim().split(/\s+/);
    const type = parts[0];
    const d = parseInt(parts[1], 10);

    if (type === 'C') {
      offset = (offset + d) % n;
    } else if (type === 'A') {
      offset = (offset - d + n) % n;
    } else if (type === 'R') {
      const idx = (offset + d - 1) % n;
      out.push(a[idx]);
    }
  }

  console.log(out.join('\n'));
}

solve();

