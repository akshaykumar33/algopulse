const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const x = parseInt(input[ptr++], 10);
        let hasLess = false;
        let hasGreater = false;
        let hasEqual = false;

        for (let i = 0; i < n; i++) {
            const val = parseInt(input[ptr++], 10);
            if (val < x) hasLess = true;
            else if (val > x) hasGreater = true;
            else hasEqual = true;
        }

        if (!hasLess || !hasGreater || hasEqual) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
