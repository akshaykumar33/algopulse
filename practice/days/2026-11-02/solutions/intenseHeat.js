const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = parseFloat(tokens[ptr++]);
    }
    
    const pref = new Array(n + 1);
    pref[0] = 0;
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
    
    let maxAvg = -Infinity;
    for (let len = k; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const sum = pref[i + len] - pref[i];
            const avg = sum / len;
            if (avg > maxAvg) {
                maxAvg = avg;
            }
        }
    }
    
    console.log(maxAvg.toFixed(15));
}

solve();
