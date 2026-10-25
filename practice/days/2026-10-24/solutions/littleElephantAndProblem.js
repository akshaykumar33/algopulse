const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const n = parseInt(lines[0], 10);
    const arr = lines[1].trim().split(/\s+/).map(Number);
    
    const sorted = [...arr].sort((a, b) => a - b);
    let diff = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] !== sorted[i]) {
            diff++;
        }
    }
    
    if (diff <= 2) {
        console.log("YES");
    } else {
        console.log("NO");
    }
}

solve();
