const fs = require('fs');
const data = fs.readFileSync(0, 'utf-8');
const lines = data.trim().split(/\r?\n/);
let currentLine = 0;
const t = Number(lines[currentLine++]);
const out = [];
for (let i = 0; i < t; i++) {
    if (currentLine >= lines.length) break;
    const parts = lines[currentLine++].trim().split(/\s+/);
    const n = Number(parts[0]);
    const k = Number(parts[1]);
    const res = [];
    let l = 1, r = n;
    while (l <= r) {
        res.push(r--);
        if (l <= r) res.push(l++);
    }
    out.push(res.join(' '));
}
process.stdout.write(out.join('\n') + '\n');
