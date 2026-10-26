const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const x = parseInt(lines[ptr++], 10);
        const target = x + 4;
        let ok = false;
        for (let d = 3; d * d <= target; d++) {
            if (target % d === 0 && Math.floor(target / d) >= 3) {
                ok = true;
                break;
            }
        }
        out.push(ok ? 'YES' : 'NO');
    }
    console.log(out.join('\n'));
}

solve();
