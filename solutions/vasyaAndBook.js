const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const x = parseInt(lines[ptr++], 10);
        const y = parseInt(lines[ptr++], 10);
        const d = parseInt(lines[ptr++], 10);

        if (Math.abs(y - x) % d === 0) {
            out.push(Math.abs(y - x) / d);
            continue;
        }

        let ans = Infinity;
        if ((y - 1) % d === 0) {
            const steps = Math.ceil((x - 1) / d) + (y - 1) / d;
            if (steps < ans) ans = steps;
        }
        if ((n - y) % d === 0) {
            const steps = Math.ceil((n - x) / d) + (n - y) / d;
            if (steps < ans) ans = steps;
        }

        out.push(ans === Infinity ? -1 : ans);
    }
    console.log(out.join('\n'));
}

solve();
