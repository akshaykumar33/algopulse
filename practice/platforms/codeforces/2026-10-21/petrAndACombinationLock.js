const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const n = parseInt(lines[0]);
    const a = [];
    for (let i = 1; i <= n; i++) {
        a.push(parseInt(lines[i]));
    }
    
    let possible = false;
    const total = 1 << n;
    for (let mask = 0; mask < total; mask++) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                sum += a[i];
            } else {
                sum -= a[i];
            }
        }
        if (sum % 360 === 0) {
            possible = true;
            break;
        }
    }
    
    if (possible) {
        console.log("YES");
    } else {
        console.log("NO");
    }
}

solve();
