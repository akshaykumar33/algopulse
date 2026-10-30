const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const x = parseInt(tokens[ptr++], 10);
        let maxA = 0;
        let exact = false;
        for (let i = 0; i < n; i++) {
            const a = parseInt(tokens[ptr++], 10);
            if (a > maxA) maxA = a;
            if (a === x) exact = true;
        }
        
        if (exact) {
            out.push(1);
        } else if (x > maxA) {
            let ans = Math.floor(x / maxA);
            if (x % maxA !== 0) ans++;
            out.push(ans);
        } else {
            out.push(2);
        }
    }
    console.log(out.join('\n'));
}

solve();
