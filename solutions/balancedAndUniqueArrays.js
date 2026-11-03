const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        if (n % 4 !== 0) {
            out.push('NO');
        } else {
            out.push('YES');
            const m = n / 4;
            const a = [];
            const b = [];
            for (let i = 1; i <= m; i++) a.push(i);
            for (let i = 3 * m + 1; i <= n; i++) a.push(i);
            for (let i = m + 1; i <= 3 * m; i++) b.push(i);
            out.push(a.join(' '));
            out.push(b.join(' '));
        }
    }

    console.log(out.join('\n'));
}

solve();
