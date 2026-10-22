const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].trim().split(/\s+/).map(Number);
        let minVal = Infinity;
        let minIdx = 0;
        for (let j = 0; j < n; j++) {
            if (arr[j] < minVal) {
                minVal = arr[j];
                minIdx = j + 1;
            }
        }
        out.push(minIdx);
    }
    console.log(out.join('\n'));
}

solve();
