const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const x = parseInt(tokens[ptr++], 10);
        let ok = false;
        for (let j = 0; j < n; j++) {
            const a = parseInt(tokens[ptr++], 10);
            if (a >= x) {
                ok = true;
            }
        }
        if (ok) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
