const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const k = parseInt(tokens[ptr++], 10);
        let ok = true;
        for (let j = 0; j < k; j++) {
            const s = tokens[ptr++];
            if (!ok) continue;
            let hasA = false;
            let hasB = false;
            for (let c = 0; c < s.length; c++) {
                const ch = s.charCodeAt(c);
                if (ch >= 97 && ch <= 109) {
                    hasA = true;
                } else if (ch >= 110 && ch <= 122) {
                    hasB = true;
                } else {
                    hasA = false;
                    hasB = false;
                    break;
                }
            }
            if ((hasA && hasB) || (!hasA && !hasB)) {
                ok = false;
            }
        }
        if (ok) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
