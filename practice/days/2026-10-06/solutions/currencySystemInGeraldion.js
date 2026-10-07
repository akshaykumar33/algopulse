const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const n = parseInt(lines[0], 10);
    const arr = lines[1].split(/\s+/).map(Number);
    
    let hasOne = false;
    for (let i = 0; i < n; i++) {
        if (arr[i] === 1) {
            hasOne = true;
            break;
        }
    }
    
    if (hasOne) {
        console.log("-1");
    } else {
        console.log("1");
    }
}

solve();
