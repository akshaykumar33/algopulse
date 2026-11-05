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
        const x = tokens[ptr++];
        
        const pos = [];
        for (let i = 0; i < n; i++) {
            if (s[i] === x) {
                pos.push(i);
            }
        }
        
        let ans = 0;
        if (pos.length === 0) {
            out.push(0);
            continue;
        }
        
        let last = -1;
        for (let i = 0; i < pos.length; i++) {
            const curr = pos[i];
            const leftLen = curr - last;
            const rightLen = n - curr;
            ans += leftLen * rightLen;
            last = curr;
        }
        
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
