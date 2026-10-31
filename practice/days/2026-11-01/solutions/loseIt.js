const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    
    const target = [4, 8, 15, 16, 23, 42];
    const mapVal = {};
    for (let i = 0; i < 6; i++) {
        mapVal[target[i]] = i;
    }
    
    const count = new Array(6).fill(0);
    
    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        const idx = mapVal[val];
        if (idx === 0) {
            count[0]++;
        } else {
            if (count[idx - 1] > count[idx]) {
                count[idx]++;
            }
        }
    }
    
    const complete = count[5];
    const ans = n - complete * 6;
    console.log(ans);
}

solve();
