const fs = require('fs');
const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let lineIdx = 0;
const t = parseInt(lines[lineIdx++], 10);
const out = [];
for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const a = lines[lineIdx++].trim().split(/\s+/).map(Number);
    const b = lines[lineIdx++].trim().split(/\s+/).map(Number);
    let maxScore = 0;
    for (let j = 0; j < n; j++) {
        let score = a[j] * 20 - b[j] * 10;
        if (score < 0) score = 0;
        if (score > maxScore) maxScore = score;
    }
    out.push(maxScore);
}
console.log(out.join('\n'));
