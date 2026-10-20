const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        if (ptr >= input.length) break;
        const s = input[ptr++].trim();
        const n = s.length;

        if (s[0] !== '1' || s[n - 1] === '9') {
            out.push('NO');
            continue;
        }

        let ok = true;
        for (let i = 1; i < n - 1; i++) {
            if (s[i] === '0') {
                ok = false;
                break;
            }
        }

        out.push(ok ? 'YES' : 'NO');
    }

    console.log(out.join('\n'));
}

solve();
