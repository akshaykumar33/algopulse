const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const maxVal = 100000;
    const count = new Array(maxVal + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        count[val]++;
    }
    
    let ans = 1;
    if (n > 1) {
        for (let g = 2; g <= maxVal; g++) {
            let cur = 0;
            for (let multiple = g; multiple <= maxVal; multiple += g) {
                cur += count[multiple];
            }
            if (cur > ans) {
                ans = cur;
            }
        }
    }
    
    console.log(ans);
}

solve();
