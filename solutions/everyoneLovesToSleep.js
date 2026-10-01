const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const H = parseInt(input[ptr++], 10);
        const M = parseInt(input[ptr++], 10);
        const sleepMinutes = H * 60 + M;

        let minDiff = 1440;

        for (let i = 0; i < n; i++) {
            const h = parseInt(input[ptr++], 10);
            const m = parseInt(input[ptr++], 10);
            const alarmMinutes = h * 60 + m;
            let diff = alarmMinutes - sleepMinutes;
            if (diff < 0) {
                diff += 1440;
            }
            if (diff < minDiff) {
                minDiff = diff;
            }
        }

        const ansH = Math.floor(minDiff / 60);
        const ansM = minDiff % 60;
        out.push(`${ansH} ${ansM}`);
    }

    console.log(out.join('\n'));
}

solve();
