const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }
        
        let ok = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] <= arr[i + 1]) {
                ok = true;
                break;
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
