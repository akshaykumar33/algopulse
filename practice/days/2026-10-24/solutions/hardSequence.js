const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const maxN = 128;
    const seq = [0];
    const last = {};
    last[0] = 0;
    
    for (let i = 1; i < maxN; i++) {
        const prev = seq[i - 1];
        if (last[prev] === undefined || last[prev] === i - 1) {
            seq.push(0);
        } else {
            seq.push(i - 1 - last[prev]);
        }
        last[prev] = i - 1;
    }
    
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i], 10);
        const target = seq[n - 1];
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (seq[j] === target) {
                count++;
            }
        }
        out.push(count);
    }
    console.log(out.join('\n'));
}

solve();
