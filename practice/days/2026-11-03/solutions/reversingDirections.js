const fs = require('fs');
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++].trim(), 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++].trim(), 10);
        const steps = [];
        for (let i = 0; i < n; i++) {
            const line = lines[ptr++].trim();
            const spaceIdx = line.indexOf(' ');
            const dir = line.slice(0, spaceIdx);
            const road = line.slice(spaceIdx + 4);
            steps.push({ dir, road });
        }
        steps.reverse();
        out.push(`Begin on ${steps[0].road}`);
        for (let i = 1; i < n; i++) {
            const prevDir = steps[i - 1].dir;
            const newDir = prevDir === 'Left' ? 'Right' : 'Left';
            out.push(`${newDir} on ${steps[i].road}`);
        }
    }
    console.log(out.join('\n'));
}
solve();
