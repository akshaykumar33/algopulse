const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    let idx = 1;
    for (let i = 0; i < t; i++) {
        if (idx >= lines.length) break;
        const s1 = lines[idx++];
        const s2 = lines[idx++];
        let minDist = 0;
        let maxDist = 0;
        for (let j = 0; j < s1.length; j++) {
            const c1 = s1[j];
            const c2 = s2[j];
            if (c1 !== '?' && c2 !== '?') {
                if (c1 !== c2) {
                    minDist++;
                    maxDist++;
                }
            } else {
                maxDist++;
            }
        }
        out.push(minDist + ' ' + maxDist);
    }
    console.log(out.join('\n'));
}

solve();
