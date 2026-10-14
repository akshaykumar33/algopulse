const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const n = parseInt(lines[0], 10);
    const arr = lines[1].trim().split(/\s+/).map(Number);
    
    let maxLen = 0;
    let curLen = 0;
    
    for (let i = 0; i < n; i++) {
        if (arr[i] !== 0) {
            curLen++;
            if (curLen > maxLen) {
                maxLen = curLen;
            }
        } else {
            curLen = 0;
        }
    }
    
    console.log(maxLen);
}

solve();
