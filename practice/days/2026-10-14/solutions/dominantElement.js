const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    let lineIdx = 1;
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[lineIdx++], 10);
        const arr = input[lineIdx++].split(/\s+/).map(Number);
        const freq = new Map();
        for (let j = 0; j < n; j++) {
            const val = arr[j];
            freq.set(val, (freq.get(val) || 0) + 1);
        }
        let maxFreq = 0;
        let maxCount = 0;
        for (const cnt of freq.values()) {
            if (cnt > maxFreq) {
                maxFreq = cnt;
                maxCount = 1;
            } else if (cnt === maxFreq) {
                maxCount++;
            }
        }
        if (maxCount === 1) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
