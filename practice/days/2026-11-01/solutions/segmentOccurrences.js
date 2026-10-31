const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const t = tokens[ptr++];

    const match = new Array(n).fill(0);
    for (let i = 0; i <= n - m; i++) {
        let ok = true;
        for (let j = 0; j < m; j++) {
            if (s[i + j] !== t[j]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            match[i] = 1;
        }
    }

    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + match[i];
    }

    const out = [];
    for (let i = 0; i < q; i++) {
        const l = parseInt(tokens[ptr++], 10) - 1;
        const r = parseInt(tokens[ptr++], 10);
        const rightLimit = r - m + 1;
        if (rightLimit < l) {
            out.push(0);
        } else {
            out.push(pref[rightLimit] - pref[l]);
        }
    }
    console.log(out.join('\n'));
}

solve();
