const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = tokens[ptr++];

        let hasLen1 = false;
        let curLen = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] === '0') {
                curLen++;
            } else {
                if (curLen === 1) {
                    hasLen1 = true;
                    break;
                }
                curLen = 0;
            }
        }
        if (curLen === 1) hasLen1 = true;

        if (hasLen1) {
            out.push('NO');
            continue;
        }

        out.push('YES');
        const p = new Int32Array(n);
        let i = 0;
        while (i < n) {
            if (s[i] === '1') {
                p[i] = i + 1;
                i++;
            } else {
                let j = i;
                while (j < n && s[j] === '0') j++;
                for (let k = i; k < j - 1; k++) {
                    p[k] = k + 2;
                }
                p[j - 1] = i + 1;
                i = j;
            }
        }
        out.push(p.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
