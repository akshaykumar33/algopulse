const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            a[i] = parseInt(tokens[ptr++], 10);
        }
        
        let left = 0;
        while (left < n && a[left] >= left) {
            left++;
        }
        left--;
        
        let right = n - 1;
        while (right >= 0 && a[right] >= (n - 1 - right)) {
            right--;
        }
        right++;
        
        if (left >= right) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
