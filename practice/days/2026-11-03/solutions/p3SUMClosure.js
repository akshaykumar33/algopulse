const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const pos = [];
        const neg = [];
        let zeros = 0;
        const set = new Set();
        for (let i = 0; i < n; i++) {
            const v = parseInt(tokens[ptr++], 10);
            set.add(v);
            if (v > 0) pos.push(v);
            else if (v < 0) neg.push(v);
            else zeros++;
        }
        if (pos.length >= 3 || neg.length >= 3) {
            out.push('NO');
            continue;
        }
        const reduced = [];
        for (const p of pos) reduced.push(p);
        for (const ne of neg) reduced.push(ne);
        for (let i = 0; i < Math.min(zeros, 3); i++) reduced.push(0);
        const m = reduced.length;
        let ok = true;
        for (let i = 0; i < m && ok; i++) {
            for (let j = i + 1; j < m && ok; j++) {
                for (let k = j + 1; k < m && ok; k++) {
                    const sum = reduced[i] + reduced[j] + reduced[k];
                    if (!set.has(sum)) {
                        ok = false;
                    }
                }
            }
        }
        out.push(ok ? 'YES' : 'NO');
    }
    console.log(out.join('\n'));
}
solve();
