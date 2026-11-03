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
        
        const p = new Array(n + 1);
        let l = 1, r = n;
        for (let i = 0; i < n; i++) {
            if (s[i] === '0') {
                p[i + 1] = l++;
            } else {
                p[i + 1] = r--;
            }
        }
        
        let ok = true;
        l = 1;
        r = n;
        for (let i = 0; i < n; i++) {
            const mid = Math.floor((l + r) / 2);
            if (s[i] === '0') {
                if (p[mid] === l + (s[i] === '0' ? 0 : 0)) { }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        
        const ans = [];
        for (let i = 1; i <= n; i++) ans.push(p[i]);
        out.push(ans.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
