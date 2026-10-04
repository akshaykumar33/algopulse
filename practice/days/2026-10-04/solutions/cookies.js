const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const n = parseInt(lines[0], 10);
    const arr = lines[1].split(/\s+/).map(Number);
    
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += arr[i];
    }
    
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if ((sum - arr[i]) % 2 === 0) {
            ans++;
        }
    }
    
    console.log(ans);
}

solve();
