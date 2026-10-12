const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let idx = 0;
    const t = parseInt(lines[idx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const parts = lines[idx++].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        let k = parseInt(parts[1], 10);
        let cost = 0;
        for (let j = 0; j < n; j++) {
            const file = lines[idx++].trim().split(/\s+/);
            const time = parseInt(file[0], 10);
            const rate = parseInt(file[1], 10);
            if (k >= time) {
                k -= time;
            } else {
                cost += (time - k) * rate;
                k = 0;
            }
        }
        out.push(cost);
    }
    console.log(out.join('\n'));
}

solve();
