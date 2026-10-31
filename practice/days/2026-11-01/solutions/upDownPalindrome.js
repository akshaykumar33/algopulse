const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = tokens[ptr++];
        
        let c0 = 0;
        let c1 = 0;
        for (let j = 0; j < n; j++) {
            if (s[j] === '0') c0++;
            else c1++;
        }

        if (c0 % 2 !== 0 && c1 % 2 !== 0) {
            out.push("NO");
        } else {
            out.push("YES");
        }
    }
    console.log(out.join('\n'));
}

solve();
