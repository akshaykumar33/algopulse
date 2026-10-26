const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const p = lines[ptr++].split(/\s+/).map(Number);
        
        let t1 = 0;
        let t2 = 0;
        let maxAhead = 0;
        let totalTime = 0;

        for (let j = 0; j < n - 1; j++) {
            t1 += p[j];
            if (t2 < t1) {
                t2 = t1;
            }
            t2 += p[j];
        }

        out.push(t2);
    }

    console.log(out.join('\n'));
}

solve();
