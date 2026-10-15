const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        if (lineIdx >= lines.length) break;
        const n = parseInt(lines[lineIdx++], 10);
        const nums = lines[lineIdx++].split(/\s+/).map(Number);
        let sum = 0;
        for (let j = 0; j < n; j++) {
            sum += nums[j];
        }
        out.push(sum);
    }
    console.log(out.join('\n'));
}

solve();
